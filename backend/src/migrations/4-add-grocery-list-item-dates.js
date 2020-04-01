'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'grocery_list_items',
          'consumption_date',
          { type: Sequelize.DataTypes.DATEONLY, allowNull: false, },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'grocery_list_items',
          'purchase_date',
          { type: Sequelize.DataTypes.DATEONLY, allowNull: false, },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'grocery_list_items',
          'expiration_date',
          { type: Sequelize.DataTypes.DATEONLY, allowNull: false, },
          { transaction: t }
        ),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn(
          'grocery_list_items',
          'consumption_date',
          { transaction: t }
        ),
        queryInterface.removeColumn(
          'grocery_list_items',
          'purchase_date',
          { transaction: t }
        ),
        queryInterface.removeColumn(
          'grocery_list_items',
          'expiration_date',
          { transaction: t }
        ),
      ]);
    });
  },
};
