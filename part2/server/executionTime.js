'use strict';

module.exports = () => {
    return (req, res, next) => {
        const startTime = (new Date()).getTime();

        next();

        res.once('finish', () => {
            const endTime = (new Date()).getTime();

            console.log(`Time to execute [${req.method}] ${req.url}: ${endTime - startTime} msec.`);
        });
    };
};
