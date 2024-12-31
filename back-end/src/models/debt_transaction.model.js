import { DataTypes } from "sequelize";

const DebtTransaction = (sequelize) => {
    return sequelize.define(
        "debt_transaction",
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            debt_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: "debts",
                    key: "id",
                },
            },
            transaction_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "transaction",
                    key: "id",
                },
            },
            status: {
                type: DataTypes.ENUM("PENDING", "PAID", "READ"),
                defaultValue: "PENDING",
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            tableName: "debt_transaction",
            timestamps: false,
        }
    );
};

export default DebtTransaction;
