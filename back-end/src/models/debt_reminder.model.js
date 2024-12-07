import { DataTypes } from 'sequelize';

const Debt = (sequelize) => {
    return sequelize.define('debt', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        creditor_account: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        debtor_account: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(18, 8),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        due_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('pending', 'paid', 'canceled'),
            defaultValue: 'pending',
        },
    }, {
        tableName: 'debts',
        timestamps: false,
    });
}

export default Debt;
