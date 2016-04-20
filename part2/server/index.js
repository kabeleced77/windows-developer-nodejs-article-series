'use strict';

const restify = require('restify');

const executionTime = require('./executionTime'),
    controllers = require('../controllers');

function Server() {
    let server;
    
    this.start = () => {
        server = restify.createServer();

        server.use(restify.CORS());
        server.use(executionTime());

        initializeControllers();

        server.listen(8000, () => console.log('Server is up and running.'));
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
        controllers.forEach(controller => controller.initialize(server));
    }
}
