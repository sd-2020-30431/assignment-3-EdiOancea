import { Application } from 'express';
import MiddlewareType from './interfaces/Middleware';

class App {
  private app: Application;
  private port: number;
  private frontMiddlewares: MiddlewareType[];
  private controllers: any[];
  private backMiddlewares: MiddlewareType[];

  constructor(
    express: Application,
    port: number,
    frontMiddlewares: MiddlewareType[],
    controllers: any[],
    backMiddlewares: MiddlewareType[],
  ) {
    this.app = express;
    this.port = port;

    this.frontMiddlewares = frontMiddlewares;
    this.controllers = controllers;
    this.backMiddlewares = backMiddlewares;
    this.useFrontMiddlewares();
    this.useRoutes();
    this.useBackMiddlewares();
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

  public listen() {
    return this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}

export default App;
