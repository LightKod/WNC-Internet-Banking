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
            allowNull: false,
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
