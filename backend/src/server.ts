import App from './app'
import * as bodyParser from 'body-parser';
import UserController from './controllers/User';

const app = new App({
  port: 5000,
  controllers: [
    new UserController(),
  ],
  middleWares: [
    bodyParser.json(),
  ],
});

app.listen();
