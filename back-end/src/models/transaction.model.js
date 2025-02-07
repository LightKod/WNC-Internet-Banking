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
      },
      destination_account: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      transaction_type: {
        type: DataTypes.ENUM("internal", "external", "debt-payment","internal-deposit"),
        allowNull: false,
      },
      fee_payer: {
        type: DataTypes.ENUM("sender", "receiver"),
        defaultValue: "sender",
      },
      content: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.ENUM("PENDING", "SUCCESS", "FAILED"),
        defaultValue: "PENDING",
        allowNull: false,
      },
      transaction_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      source_bank: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      destination_bank: {
        type: DataTypes.STRING(50),
        allowNull: true,
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
