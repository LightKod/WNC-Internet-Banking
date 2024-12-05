// models/transaction.model.js
import { DataTypes } from "sequelize";

const Transaction = (sequelize) => {
  return sequelize.define(
    "transaction",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      source_account: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      destination_account: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("PENDING", "SUCCESS", "FAILED"),
        allowNull: false,
      },
      transaction_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      remarks: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "transaction",
      timestamps: false,
    }
  );
};

export default Transaction;
