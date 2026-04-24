const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const { timeStamp } = require('node:console');

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaruKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.BIGINT, // unix timestamp
            defaultValue: () => Math.floor(Date.now() / 1000),
        },
        updated_at: {
            type: DataTypes.BIGINT,
            defaultValue: () => Math.floor(Date.now() / 1000),
        },
    },
    {
        tableName: 'users',
        timestamps: false,
    }
);

modules.exports = User;