'use strict';

const customer = require('../services').customer;

function CustomerController() {
    this.initialize = (server) => {
        server.addRoute('customers', all, 'get');
        server.addRoute('customer/:id', getById, 'get');
        server.addRoute('customer/:id', remove, 'del');
        server.addRoute('customer', post, 'post');
        server.addRoute('customer/:id', update, 'put');
    };

    function all(req, res) {
        res.json(200, customer.all());
    }

    function getById(req, res) {
        const customer = customer.get(req.params.id);

        if (customer) {
            return res.json(200, customer);
        }

        res.send(404, 'Customer not found');
    }

    function remove(req, res) {
        res.json(200, customer.remove(req.params.id));
    }

    function post(req, res) {
        res.json(200, customer.add(req.body.firstName, req.body.lastName));
    }

    function update(req, res) {
        res.json(200, customer.update(req.params.id, req.body.firstName, req.body.lastName));
    }
}

module.exports = new CustomerController();
