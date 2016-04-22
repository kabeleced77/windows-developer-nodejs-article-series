'use strict';

const operations = require('../services').operations;

function CalculateController() {
    this.initialize = (server) => {
        server.addRoute('calculate/add/:operand1/:operand2', add);
        server.addRoute('calculate/subtract/:operand1/:operand2', subtract, 'del');
        server.addRoute('calculate/multiply', multiply, 'post');
        server.addRoute('calculate/divide', divide, 'put');
    };

    function ensureValidParameters(paramsObj) {
        if (!paramsObj.operand1) {
            throw new Error('First operand is mandatory.');
        }

        if (!paramsObj.operand2) {
            throw new Error('Second operand is mandatory.');
        }
    }

    function parseParameters(paramsObj) {
        ensureValidParameters(paramsObj);

        return {
            operand1: parseFloat(paramsObj.operand1),
            operand2: parseFloat(paramsObj.operand2)
        }
    }

    function sendResult(res, result) {
        res.json(200, {
            result: result
        });
    }

    function add(req, res) {
        const params = parseParameters(req.params);
        sendResult(res, operations.add(params.operand1, params.operand2));
    }

    function subtract(req, res) {
        const params = parseParameters(req.params);
        sendResult(res, operations.subtract(params.operand1, params.operand2));
    }

    function multiply(req, res) {
        const params = parseParameters(req.body);
        sendResult(res, operations.multiply(params.operand1, params.operand2));
    }

    function divide(req, res) {
        const params = parseParameters(req.body);
        sendResult(res, operations.divide(params.operand1, params.operand2));
    }
}

module.exports = new CalculateController();
