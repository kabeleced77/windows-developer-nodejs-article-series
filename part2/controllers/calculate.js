'use strict';

const operations = require('../services').operations;

function CalculateController() {
    this.initialize = (server) => {
        server.addRoute('operation/add/:operand1/:operand2', add);
        server.addRoute('operation/subtract/:operand1/:operand2', subtract, 'del');
        server.addRoute('operation/multiply/:operand1/:operand2', multiply, 'post');
        server.addRoute('operation/divide/:operand1/:operand2', divide, 'put');
    };

    function ensureValidParameters(req) {
        if (!req.params.operand1) {
            throw new Error('First operand is mandatory.');
        }

        if (!req.params.operand2) {
            throw new Error('Second operand is mandatory.');
        }
    }

    function parseParameters(req) {
        ensureValidParameters(req);

        return {
            operand1: parseFloat(req.params.operand1),
            operand2: parseFloat(req.params.operand2)
        }
    }

    function sendResult(res, result) {
        res.json(200, {
            result: result
        });
    }

    function add(req, res) {
        const params = parseParameters(req);
        sendResult(res, operations.add(params.operand1, params.operand2));
    }

    function subtract(req, res) {
        const params = parseParameters(req);
        sendResult(res, operations.subtract(params.operand1, params.operand2));
    }

    function multiply(req, res) {
        const params = parseParameters(req);
        sendResult(res, operations.multiply(params.operand1, params.operand2));
    }

    function divide(req, res) {
        const params = parseParameters(req);
        sendResult(res, operations.divide(params.operand1, params.operand2));
    }
}

module.exports = new CalculateController();
