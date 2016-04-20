'use strict';

module.exports = () => {
    return (req, res, next) => {
        const startTime = (new Date()).getTime();

        next();

        const endTime = (new Date()).getTime();

        console.log('Time to execute', req.address, endTime - startTime, 'msec.');
    };
};
