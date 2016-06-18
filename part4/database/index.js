'use strict';

const Sequelize = require('sequelize');

let config;
let database;

function Database() {
    const models = {};
    let sequelize;

    this.initialize = () => {
        sequelize = new Sequelize(config.connectionString);

        initializeModels();

        return syncDatabase()
            .then(() => {
                return {
                    models: models,
                    sequelize: sequelize
                };
            });
    };

    function initializeModels() {
        const customerModel = sequelize.import('./customerModel.js');
        const billModel = sequelize.import('./billModel.js');
        models[customerModel.name] = customerModel;
        models[billModel.name] = billModel;

        Object.keys(models).forEach(model => {
            if (!!models[model].associate) {
                models[model].associate(models);
            }
        });
    }

    function syncDatabase() {
        return sequelize.sync({
            force: true // Careful, this forces sequelize to recreate the database entirely upon server start!
        });
    }
}

module.exports = {
    configure: connectionString => {
        config = {
            connectionString
        };
    },
    get: () => {
        if (!config) {
            throw new Error('Plase call .configure first before trying to resolve a database instance.');
        }

        if (database) {
            return Promise.resolve(database);
        }

        return new Promise(resolve => {
            var dbInit = new Database();

            dbInit.initialize()
                .then(db => {
                    database = db;
                    resolve(database);
                });
        });
    }
};
