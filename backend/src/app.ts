import { Application } from 'express';
import MiddlewareType from './interfaces/Middleware';

class App {
  private app: Application;
  private server: any;
  private io: any;
  private port: number;
  private frontMiddlewares: MiddlewareType[];
  private controllers: any[];
  private backMiddlewares: MiddlewareType[];
  private socketHandlers: any[];

  constructor(
    express: Application,
    httpServer: any,
    io: any,
    port: number,
    frontMiddlewares: MiddlewareType[],
    controllers: any[],
    backMiddlewares: MiddlewareType[],
    socketHandlers: any[],
  ) {
    this.app = express;
    this.server = httpServer.createServer(this.app);
    this.io = io(this.server);
    this.port = port;

    this.frontMiddlewares = frontMiddlewares;
    this.controllers = controllers;
    this.backMiddlewares = backMiddlewares;
    this.socketHandlers = socketHandlers;
    this.useFrontMiddlewares();
    this.useRoutes();
    this.useBackMiddlewares();
    this.useSockets();
  }

  private useFrontMiddlewares() {
    this.frontMiddlewares.forEach(middleWare => {
      this.app.use(middleWare);
    });
  }

  private useRoutes() {
    this.controllers.forEach(controller => {
      this.app.use('/', controller.router)
    })
  }

  private useBackMiddlewares() {
    this.backMiddlewares.forEach(middleWare => {
      this.app.use(middleWare);
    });
  }

  private useSockets() {
    this.io.on('connection', (socket: any) => {
      this.socketHandlers.forEach(socketHandler => {
        socketHandler.handleSocket(socket);
      });
    });
  }

  public listen() {
    return this.server.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}

export default App;
