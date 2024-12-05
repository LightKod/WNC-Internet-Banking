import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const RefreshToken = (sequelize) => {
    return sequelize.define('RefreshToken', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        expires_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: 'refresh_tokens',
        timestamps: false,
    });
}

// // Thiết lập quan hệ giữa các bảng
// User.hasMany(RefreshToken, { foreignKey: 'user_id' });
// RefreshToken.belongsTo(User, { foreignKey: 'user_id' });

export default RefreshToken;