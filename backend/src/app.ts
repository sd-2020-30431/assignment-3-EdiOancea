import { Application } from 'express';

class App {
  private app: Application;
  private port: number;
  private frontMiddlewares;
  private controllers;
  private backMiddlewares;

  constructor(
    express: Application,
    port: number,
    frontMiddlewares: any[],
    controllers: any[],
    backMiddlewares: any[],
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
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}

export default App;
