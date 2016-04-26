'use strict';

const customers = require('../services').customers;

function CustomerController() {
    this.initialize = (server) => {
        server.addRoute('customers', all);
        server.addRoute('customer/:id', getById);
        server.addRoute('customer/:id', remove, 'del');
        server.addRoute('customer', post, 'post');
        server.addRoute('customer/:id', update, 'put');
    };

    function all(req, res) {
        res.json(200, customers.all());
    }

    function getById(req, res) {
        const customer = customers.get(req.params.id);

        if (customer) {
            return res.json(200, customer);
        }

        res.send(404, 'Customer not found');
    }

    function remove(req, res) {
        res.json(200, customers.remove(req.params.id));
    }

    function post(req, res) {
        res.json(200, customers.add(req.body.firstName, req.body.lastName));
    }

    function update(req, res) {
        res.json(200, customers.update(req.params.id, req.body.firstName, req.body.lastName));
    }
}

module.exports = new CustomerController();
