import dbConfig from "../config/database.js";
import Sequelize from "sequelize";

import User from "./user.model.js";
import Transaction from "./transaction.model.js";
import Account from "./account.model.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = User(sequelize);
db.user = Account(sequelize);
db.user = Transaction(sequelize);

export default db;