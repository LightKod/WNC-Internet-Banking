import { DataTypes } from 'sequelize';
const LinkedBanks = (sequelize) => {
    const LinkedBanks = sequelize.define('LinkedBanks', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        bank_code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        bank_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        public_key: { // Hash signature
            type: DataTypes.TEXT,
            allowNull: false,
        },
        secret_key: { // Hash data
            type: DataTypes.STRING,
            allowNull: false,
        },
        encryption_type:
        {
            type: DataTypes.ENUM('RSA', 'PGP'),
            allowNull: false
        },
        api_base_url: {
            type: DataTypes.STRING,
            allowNull: false
        },

    }, {
        tableName: 'linked_banks',
        timestamps: false,
    });

    return LinkedBanks;
}

export default LinkedBanks