import { Model } from 'sequelize';

const connection = (db, Sequelize, sequelize) => {
  const dbWithoutAssoc = Object.keys(db).reduce((acc, modelName) => ({
    ...acc,
    [modelName]: db[modelName].model,
  }), {});

  Object.keys(db).forEach(modelName => {
    const { associate } = db[modelName];

    if (typeof associate === 'function') {
      associate(dbWithoutAssoc);
    }
  });

  return {
    ...dbWithoutAssoc,
    Sequelize,
    sequelize,
  };
};

export default connection;
