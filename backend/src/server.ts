import App from './app'
import * as bodyParser from 'body-parser';
import UserController from './controllers/User';
import ErrorMiddleware from './middlewares/Error';

const app = new App({
  port: 5000,
  controllers: [
    new UserController(),
  ],
  frontMiddlewares: [
    bodyParser.json(),
  ],
  backMiddlewares: [
    ErrorMiddleware,
  ],
});

app.listen();
