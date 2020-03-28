import { Sequelize } from 'sequelize';
import * as bcrypt from 'bcrypt';
import * as express from 'express';
import * as bodyParser from 'body-parser';
const Bottle = require('bottlejs');

import App from '../app';
import connection from '../connection';
import UserModelFactory from '../models/User';
import GroceryListItemModelFactory from '../models/GroceryListItem';

import UserController from '../controllers/User';
import GroceryListItemController from '../controllers/GroceryListItem';
import UserService from '../services/User';
import GroceryListItemService from '../services/GroceryListItem';
import AuthService from '../services/Auth';
import wrapError from '../services/WrapError';
import HttpError from '../services/HttpError';

import ErrorMiddleware from '../middlewares/Error';

const bottle = new Bottle();

bottle.factory('bcrypt', () => bcrypt);
bottle.factory('express', () => express);
bottle.factory('wrapError', () => wrapError);
bottle.factory('Sequelize', () => Sequelize);
bottle.factory('ExpressRouter', ({ express }) => express.Router());

bottle.factory('sequelize', () => new Sequelize(
  'wasteless',
  'algotech',
  '',
  {
    host: 'localhost',
    dialect: 'postgres',
  }
));
bottle.factory('GroceryListItemModel', ({ sequelize }) => GroceryListItemModelFactory(sequelize));
bottle.factory('UserModel', ({ sequelize }) => UserModelFactory(sequelize));
bottle.factory('database', ({
  UserModel,
  GroceryListItemModel,
  Sequelizel,
  sequelize,
}) => connection(
  {
    User: UserModel,
    GroceryListItem: GroceryListItemModel,
  },
  Sequelize,
  sequelize,
));

bottle.factory('UserHttpError', () => new HttpError(403, 'Not yet pal'));
bottle.service('AuthService', AuthService, 'bcrypt');
bottle.service('UserService', UserService, 'database', 'AuthService', 'UserHttpError');
bottle.service('GroceryListItemService', GroceryListItemService, 'database');
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

bottle.factory('App', ({
  express,
  UserController,
  GroceryListItemController,
}) => new App(
  express(),
  5000,
  [bodyParser.json()],
  [
    UserController,
    GroceryListItemController,
  ],
  [ErrorMiddleware],
));

export default bottle;
