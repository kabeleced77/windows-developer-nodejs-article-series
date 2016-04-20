'use strict';

const operators = require('../operators');

function OperationsService() {
    this.add = operators.add;
    this.subtract = operators.subtract;
    this.multiply = operators.multiply;
    this.divide = operators.divide;
}

module.exports = new OperationsService();
