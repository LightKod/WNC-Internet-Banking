import { DataTypes } from 'sequelize';

const OTP = (sequelize) =>{
    return sequelize.define('otp', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        transaction_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true, 
        },
        purpose: {
            type: DataTypes.ENUM('transaction', 'reset_password'),
            defaultValue: 'transaction',
        },
        otp_code: {
            type: DataTypes.STRING(6),
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'pending', // pending, used, expired,comfirmed
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: 'otps',
        timestamps: false,
    });
}

export default OTP;
