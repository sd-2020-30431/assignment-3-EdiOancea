'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'password', {
      type: Sequelize.DataTypes.STRING(128),
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'password');
  },
};
