import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes, Model, ModelCtor, ModelStatic } from 'sequelize';
import process from 'process';

// Define the type for the configuration
interface Config {
  use_env_variable?: string;
  database?: string;
  username?: string;
  password?: string;
  [key: string]: any; // Allow additional properties
}


interface Db {
  [key: string]: ModelStatic<Model> | any;
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
}


const basename = path.basename(__filename);


const env = process.env.NODE_ENV || 'development';

const config: Config = require(`${__dirname}/../system/config/config.js`)[env];


const db: Db = {
  sequelize: new Sequelize(
    config.use_env_variable ? process.env[config.use_env_variable] as string : config.database as string,
    config.username||'',
    config.password,
    config
  ),
  Sequelize
};


db.sequelize
  .sync({ alter: false }) 
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch((error: Error) => {
    console.error('Error syncing database:', error);
  });

fs
  .readdirSync(__dirname)
  .filter(file => {
    console.log(file)
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts' &&
      file.indexOf('.test.ts') === -1
    );
  })
  .forEach(file => {
    console.log(file)
    const model = require(path.join(__dirname, file))(db.sequelize, DataTypes);
    db[model.name] = model;
  });

  
Object.keys(db).forEach(modelName => {
  if ((db[modelName] as any).associate) {
    (db[modelName] as any).associate(db);
  }
});

export default db;
