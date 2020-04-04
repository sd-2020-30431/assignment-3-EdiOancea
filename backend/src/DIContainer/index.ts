import { Sequelize } from 'sequelize';
import * as bcrypt from 'bcrypt';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as jwt from 'jsonwebtoken';
import * as cors from 'cors';
const Bottle = require('bottlejs');

import App from '../app';
import connection from '../connection';
import UserModelFactory from '../models/User';
import GroceryListItemModelFactory from '../models/GroceryListItem';
import AuthController from '../controllers/Auth';
import UserController from '../controllers/User';
import GroceryListItemController from '../controllers/GroceryListItem';
import TokenService from '../services/Token';
import AuthService from '../services/Auth';
import UserService from '../services/User';
import GroceryListItemService from '../services/GroceryListItem';
import EncryptionService from '../services/Encryption';
import wrapError from '../services/WrapError';
import AuthMiddlewareFactory from '../middlewares/Auth';

const bottle = new Bottle();
const env = (process.env.NODE_ENV || 'development').toUpperCase();

import IDIContainer from '../interfaces/IDIContainer';

bottle.factory('bcrypt', () => bcrypt);
bottle.factory('express', () => express);
bottle.factory('wrapError', () => wrapError);
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

bottle.service('TokenService', TokenService, 'jwt')
bottle.service('EncryptionService', EncryptionService, 'bcrypt');
bottle.service('AuthService', AuthService, 'database', 'EncryptionService', 'TokenService');
bottle.service('UserService', UserService, 'database');
bottle.service('GroceryListItemService', GroceryListItemService, 'database');
bottle.service('AuthController', AuthController, 'AuthService', 'ExpressRouter', 'wrapError');
bottle.service(
  'GroceryListItemController',
  GroceryListItemController,
  'GroceryListItemService',
  'ExpressRouter',
  'wrapError'
)
bottle.service(
  'UserController',
  UserController,
  'UserService',
  'ExpressRouter',
  'wrapError'
);

bottle.factory('App', (container: IDIContainer) => new App(
  container.express(),
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
  ],
  []
));

export default bottle;
