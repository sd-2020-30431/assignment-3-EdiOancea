import App from './app'

import * as bodyParser from 'body-parser';

import DemoController from './controllers/demo/demo.controller';

const app = new App({
  port: 5000,
  controllers: [
    new DemoController(),
  ],
  middleWares: [
    bodyParser.json(),
  ],
});

app.listen();
