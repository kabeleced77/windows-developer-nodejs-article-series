'use strict';

module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('customer', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        classMethods: {
            associate: models => Customer.hasMany(models.bill)
        }
    });

    return Customer;
};
