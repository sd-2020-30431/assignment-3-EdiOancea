import { Model, DataTypes, Sequelize } from 'sequelize';

const UserModelFactory = (sequelize: Sequelize, EncryptionService) => {
  class User extends Model {
    public id!: number;
    public email!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  };

  User.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(128),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        len: [6, 127],
      },
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
    tableName: 'users',
    sequelize: sequelize,
  });

  User.beforeCreate((user, options) => {
    user.password = EncryptionService.generateHash(user.password);
    user.email = user.email.toLowerCase();
  });

  const associate = ({ GroceryListItem }) => {
    User.hasMany(GroceryListItem, {
      sourceKey: 'id',
      foreignKey: 'userId',
      as: 'groceryListItems',
    });
  };

  return { model: User, associate };
};

export default UserModelFactory;
