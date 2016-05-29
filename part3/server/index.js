'use strict';

const restify = require('restify');

const executionTime = require('./executionTime'),
    controllers = require('../controllers'),
    database = require('../database');

function Server() {
    const that = this;
    let server;
    
    this.start = () => {
        database.configure('postgres://dev:dev:@localhost:5432/NodeJsWebApi');

        server = restify.createServer();

        server.pre(executionTime());
        
        server.use(restify.CORS());
        server.use(restify.queryParser());
        server.use(restify.bodyParser());

        initializeControllers();

        server.listen(8000, () => console.log('Server is up and running on port 8000.'));
    };

    this.addRoute = (route, callback, method) => {
        if (!route) {
            throw new Error('Parameter route is mandatory.');
        }

        if (!callback) {
            throw new Error('Parameter callback is mandatory.');
        }

        method = method || 'get';
        method = method.toLowerCase();
        
        server[method](route, callback);

        console.info(`Route [${method}] ${route} has been added.`);
    };

    function initializeControllers() {
        controllers.forEach(controller => controller.initialize(that));
    }
}

module.exports = Server;
