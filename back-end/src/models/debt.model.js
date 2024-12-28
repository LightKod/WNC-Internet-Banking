import { DataTypes } from 'sequelize';

const Debt = (sequelize) => {
    return sequelize.define('debt', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        creditor_account: { //Nguoi nhan
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        debtor_account: { //Nguoi tra
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
        cancel_note: {
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
            type: DataTypes.ENUM('NEW', 'UNREAD', 'PENDING', 'PAID', 'CANCELED'),
            defaultValue: 'NEW',
        },
    }, {
        tableName: 'debts',
        timestamps: false,
    });
}

export default Debt;
