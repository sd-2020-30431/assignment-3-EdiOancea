import { Application } from 'express';

class App {
  private app: Application;
  private server;
  private io;
  private port: number;
  private frontMiddlewares;
  private controllers;
  private backMiddlewares;
  private socketHandlers;

  constructor(
    express: Application,
    httpServer,
    io,
    port: number,
    frontMiddlewares,
    controllers,
    backMiddlewares,
    socketHandlers,
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
    this.io.on('connection', socket => {
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
