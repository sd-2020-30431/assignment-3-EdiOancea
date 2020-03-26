import * as express from 'express';
import { Application } from 'express';

class App {
  public app: Application;
  public port: number;

  constructor(appInit: {
    port: number;
    frontMiddlewares: [any];
    backMiddlewares: [any];
    controllers: [any];
  }) {
    this.app = express();
    this.port = appInit.port;

    this.useMiddlewares(appInit.frontMiddlewares);
    this.useRoutes(appInit.controllers);
    this.useMiddlewares(appInit.backMiddlewares);
  }

  private useMiddlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
    middleWares.forEach(middleWare => {
      this.app.use(middleWare)
    })
  }

  private useRoutes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router)
    })
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`)
    })
  }
}

export default App
