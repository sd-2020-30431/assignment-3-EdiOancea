import { Sequelize } from 'sequelize';
import * as bcrypt from 'bcrypt';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as jwt from 'jsonwebtoken';
import * as cors from 'cors';
import * as http from 'http';
import * as io from 'socket.io';
const Bottle = require('bottlejs');

import App from '../app';
import connection from '../connection';
import { WeeklyReportFactory, MonthlyReportFactory } from '../factories/Report';
import UserModelFactory from '../models/User';
import GroceryListItemModelFactory from '../models/GroceryListItem';
import AuthController from '../controllers/Auth';
import UserController from '../controllers/User';
import ReportController from '../controllers/Report';
import GroceryListItemController from '../controllers/GroceryListItem';
import NotificationController from '../controllers/Notification';
import TokenService from '../services/Token';
import AuthService from '../services/Auth';
import UserService from '../services/User';
import GroceryListItemService from '../services/GroceryListItem';
import EncryptionService from '../services/Encryption';
import ReportService from '../services/Report';
import AuthMiddlewareFactory from '../middlewares/Auth';

const bottle = new Bottle();
const env = (process.env.NODE_ENV || 'development').toUpperCase();

import IDIContainer from '../interfaces/IDIContainer';

bottle.factory('bcrypt', () => bcrypt);
bottle.factory('express', () => express);
bottle.factory('ExpressRouter', (container: IDIContainer) => container.express.Router());
bottle.factory('jwt', () => jwt);
bottle.factory('sequelize', () => new Sequelize(
  process.env[`DB_NAME_${env}`],
  process.env[`DB_USER_${env}`],
  process.env[`DB_PASSWORD_${env}`],
  {
    host: process.env[`DB_HOST_${env}`],
    dialect: 'postgres',
  }
));
bottle.factory(
  'GroceryListItemModel',
  (container: IDIContainer) => GroceryListItemModelFactory(container.sequelize)
);
bottle.factory(
  'UserModel',
  (container: IDIContainer) => UserModelFactory(
    container.sequelize,
    container.EncryptionService
  )
);
bottle.factory(
  'database',
  (container: IDIContainer) => connection(
    {
      User: container.UserModel,
      GroceryListItem: container.GroceryListItemModel,
    },
    Sequelize,
    container.sequelize,
  )
);

bottle.service('WeeklyReportFactory', WeeklyReportFactory);
bottle.service('MonthlyReportFactory', MonthlyReportFactory);
bottle.service('TokenService', TokenService, 'jwt')
bottle.service('EncryptionService', EncryptionService, 'bcrypt');
bottle.service(
  'ReportService',
  ReportService,
  'database',
  'WeeklyReportFactory',
  'MonthlyReportFactory',
);
bottle.service(
  'AuthService',
  AuthService,
  'database',
  'EncryptionService',
  'TokenService',
);
bottle.service('UserService', UserService, 'database');
bottle.service('GroceryListItemService', GroceryListItemService, 'database');
bottle.service('AuthController', AuthController, 'AuthService', 'ExpressRouter');
bottle.service(
  'ReportController',
  ReportController,
  'ReportService',
  'ExpressRouter',
);
bottle.service(
  'GroceryListItemController',
  GroceryListItemController,
  'GroceryListItemService',
  'ExpressRouter',
)
bottle.service(
  'UserController',
  UserController,
  'UserService',
  'ExpressRouter',
);
bottle.service('NotificationController', NotificationController, 'GroceryListItemService');
bottle.factory('App', (container: IDIContainer) => new App(
  container.express(),
  http,
  io,
  5000,
  [
    bodyParser.json(),
    cors(),
    AuthMiddlewareFactory(container.TokenService)
  ],
  [
    container.AuthController,
    container.UserController,
    container.GroceryListItemController,
    container.ReportController,
  ],
  [],
  [container.NotificationController]
));

export default bottle;
