'use strict';

module.exports = function (operand1, operand2) {
    if (operand2 === 0) {
        throw new Error('Can not divide by 0');
    }

    return operand1 / operand2;
};
