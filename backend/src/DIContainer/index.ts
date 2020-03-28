import { Sequelize, Model, DataTypes } from 'sequelize';
import * as bcrypt from 'bcrypt';
import * as express from 'express';
import * as bodyParser from 'body-parser';
const Bottle = require('bottlejs');

import App from '../app';
import UserModel from '../models/User';
import UserController from '../controllers/User';
import UserService from '../services/User';
import AuthService from '../services/Auth';
import wrapError from '../services/WrapError';
import HttpError from '../services/HttpError';
import ErrorMiddleware from '../middlewares/Error';

const bottle = new Bottle();
bottle.factory('bcrypt', () => bcrypt);
bottle.factory('express', () => express);
bottle.factory('wrapError', () => wrapError);
bottle.factory('ExpressRouter', container => container.express.Router());
bottle.factory('UserModel', container => UserModel(
  container.sequelize,
  Model,
  DataTypes
));
bottle.factory('UserHttpError', () => new HttpError(403, 'Not yet pal'));
bottle.service('AuthService', AuthService, 'bcrypt');
bottle.service('UserService', UserService, 'UserModel', 'AuthService', 'UserHttpError');
bottle.service('UserController', UserController, 'UserService', 'ExpressRouter', 'wrapError');

bottle.factory('sequelize', container => new Sequelize(
  'wasteless',
  'algotech',
  '',
  {
    host: 'localhost',
    dialect: 'postgres',
  },
));

bottle.factory('App', container => new App(
  container.express(),
  5000,
  [bodyParser.json()],
  [container.UserController],
  [ErrorMiddleware],
));

export default bottle;
