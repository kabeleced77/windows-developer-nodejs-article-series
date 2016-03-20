'use strict';

const operators = require('./operators');

const operationMap = {
    add: operators.add,
    subtract: operators.subtract,
    multiply: operators.multiply,
    divide: operators.divide
};

const operator = process.argv[2];
const operand1 = parseFloat(process.argv[3]);
const operand2 = parseFloat(process.argv[4]);

if (!operator || !operand1 || !operand2) {
    throw new Error('Please provide a operator and two operands.');
}

const result = operationMap[operator](operand1, operand2);

console.log(`Calculation result for operation ${operator}: ${result}`);
