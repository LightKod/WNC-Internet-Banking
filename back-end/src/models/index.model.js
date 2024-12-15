import dbConfig from "../config/database.js";
import Sequelize from "sequelize";

import User from "./user.model.js";
import Transaction from "./transaction.model.js";
import Account from "./account.model.js";
import RefreshToken from "./refresh_tokens.model.js";
import Debt from "./debt.model.js";
import OTP from "./otp.model.js"
import LinkedBanks from "./linked_banks.model.js"
import UserContact from "./user_contact.js";

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

db.User = User(sequelize);
db.Account = Account(sequelize);
db.Transaction = Transaction(sequelize);
db.RefreshToken = RefreshToken(sequelize);
db.OTP = OTP(sequelize);
db.Debt = Debt(sequelize)
db.LinkedBanks = LinkedBanks(sequelize)
db.UserContact = UserContact(sequelize)

export default db;