import { DataTypes } from "sequelize";

const UserContact = (sequelize) => {
    return sequelize.define(
        "user_contact",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            account_number: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            nickname: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            bank_id: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            bank_name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            tableName: "user_contact",
            timestamps: false,
        }
    );
};

export default UserContact;