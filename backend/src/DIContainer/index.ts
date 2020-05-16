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
import Mediator from '../mediator';
import { WeeklyReportFactory, MonthlyReportFactory } from '../factories/Report';
import UserModelFactory from '../models/User';
import GroceryListItemModelFactory from '../models/GroceryListItem';
import AuthController from '../controllers/Auth';
import UserController from '../controllers/User';
import ReportController from '../controllers/Report';
import GroceryListItemController from '../controllers/GroceryListItem';
import NotificationController from '../controllers/Notification';
import TokenService from '../services/Token';
import EncryptionService from '../services/Encryption';
import AuthMiddlewareFactory from '../middlewares/Auth';

import SignInQuery from '../queries/SignInQuery';
import GetMeQuery from '../queries/GetMeQuery';
import WeeklyReportQuery from '../queries/WeeklyReportQuery';
import MonthlyReportQuery from '../queries/MonthlyReportQuery';
import GroceryListItemQuery from '../queries/GroceryListItemQuery';

import CreateUserCommand from '../commands/CreateUserCommand';
import CreateGroceryListItemCommand from '../commands/CreateGroceryListItemCommand';
import UpdateGroceryListItemCommand from '../commands/UpdateGroceryListItemCommand';
import DeleteGroceryListItemCommand from '../commands/DeleteGroceryListItemCommand';

const bottle = new Bottle();
const env = (process.env.NODE_ENV || 'development').toUpperCase();

bottle.factory('bcrypt', () => bcrypt);
bottle.factory('ExpressRouter', () => express.Router());
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
  ({ sequelize }) => GroceryListItemModelFactory(sequelize)
);
bottle.factory(
  'UserModel',
  ({ sequelize, EncryptionService }) => UserModelFactory(sequelize, EncryptionService)
);
bottle.factory(
  'database',
  ({ UserModel, GroceryListItemModel, sequelize }) => connection(
    { User: UserModel, GroceryListItem: GroceryListItemModel },
    Sequelize,
    sequelize,
  )
);

bottle.service('WeeklyReportFactory', WeeklyReportFactory);
bottle.service('MonthlyReportFactory', MonthlyReportFactory);
bottle.service('TokenService', TokenService, 'jwt')
bottle.service('EncryptionService', EncryptionService, 'bcrypt');

bottle.service('SignInQuery', SignInQuery, 'database', 'EncryptionService', 'TokenService');
bottle.service('GetMeQuery', GetMeQuery, 'database');
bottle.service('WeeklyReportQuery', WeeklyReportQuery, 'database', 'WeeklyReportFactory');
bottle.service('MonthlyReportQuery', MonthlyReportQuery, 'database', 'MonthlyReportFactory');
bottle.service('GroceryListItemQuery', GroceryListItemQuery, 'database');
bottle.service('CreateUserCommand', CreateUserCommand, 'database');
bottle.service('CreateGroceryListItemCommand', CreateGroceryListItemCommand, 'database');
bottle.service('UpdateGroceryListItemCommand', UpdateGroceryListItemCommand, 'database');
bottle.service('DeleteGroceryListItemCommand', DeleteGroceryListItemCommand, 'database');

bottle.service('AuthController', AuthController, 'Mediator', 'ExpressRouter');
bottle.service('ReportController', ReportController, 'Mediator', 'ExpressRouter');
bottle.service('GroceryListItemController', GroceryListItemController, 'Mediator', 'ExpressRouter')
bottle.service('UserController', UserController, 'Mediator', 'ExpressRouter');
bottle.service('NotificationController', NotificationController, 'CreateGroceryListItemCommand', 'UpdateGroceryListItemCommand');
bottle.factory('Mediator', Mediator);
bottle.factory('App', container => new App(
  express(),
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
