import { DataTypes } from "sequelize";

const Account = (sequelize) => {
  return sequelize.define(
    "account",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      account_number: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false,
      },
      account_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      balance: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING(3),
        defaultValue: "USD",
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "account",
      timestamps: false,
    }
  );
};

export default Account;
