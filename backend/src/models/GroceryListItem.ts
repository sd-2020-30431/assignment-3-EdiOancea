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
      allowNull: false,
      validate: {
        isAlpha: true,
        len: [4, 127],
      },
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      validate: {
        isInt: true,
        min: 1,
      },
    },
    calories: {
      type: DataTypes.INTEGER.UNSIGNED,
      validate: {
        isInt: true,
        min: 1,
      },
    },
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER.UNSIGNED,
    },
    consumptionDate: {
      field: 'consumption_date',
      type: DataTypes.DATEONLY,
    },
    purchaseDate: {
      field: 'purchase_date',
      type: DataTypes.DATEONLY,
    },
    expirationDate: {
      field: 'expiration_date',
      type: DataTypes.DATEONLY,
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
