import { Model, DataTypes, Sequelize } from 'sequelize';

const GroceryListItemModelFactory = (sequelize: Sequelize) => {
  class GroceryListItem extends Model {
    public id!: number;
    public name!: string;
    public quantity!: string;
    public calories!: string;
    public userId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  };

  GroceryListItem.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    calories: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER.UNSIGNED,
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'grocery_list_items',
    sequelize: sequelize,
  });

  return { model: GroceryListItem };
};

export default GroceryListItemModelFactory;
