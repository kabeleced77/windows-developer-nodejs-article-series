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

    function sendResult(res, result) {
        res.json(200, {
            result: result
        });
    }

    function add(req, res) {
        ensureValidParameters(req);
        sendResult(res, operations.add(req.params.operand1, req.params.operand2));
    }

    function subtract(req, res) {
        ensureValidParameters(req);
        sendResult(res, operations.subtract(req.params.operand1, req.params.operand2));
    }

    function multiply(req, res) {
        ensureValidParameters(req);
        sendResult(res, operations.multiply(req.params.operand1, req.params.operand2));
    }

    function divide(req, res) {
        ensureValidParameters(req);
        sendResult(res, operations.divide(req.params.operand1, req.params.operand2));
    }
}

module.exports = new CalculateController();
