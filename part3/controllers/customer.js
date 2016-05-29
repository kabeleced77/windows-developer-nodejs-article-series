'use strict';

const customer = require('../services').customer;

function CustomerController() {
    this.initialize = (server) => {
        server.addRoute('customers', all, 'get');
        server.addRoute('customer/:id/bill', postBill, 'post');
        server.addRoute('customer/:id', getById, 'get');
        server.addRoute('customer/:id', remove, 'del');
        server.addRoute('customer/:id/bill/:billId', removeBill, 'del');
        server.addRoute('customer', post, 'post');
        server.addRoute('customer/:id', update, 'put');
    };

    function all(req, res) {
        customer.all()
            .then(list => res.json(200, list));
    }

    function getById(req, res) {
        customer.get(req.params.id)
            .then(c => {
                if (!c) {
                    res.send(404, 'Customer not found');
                }

                res.json(200, c);
            });
    }

    function remove(req, res) {
        customer.remove(req.params.id)
            .then(() => res.json(200));
    }

    function post(req, res) {
        customer.add(req.body.firstName, req.body.lastName)
            .then(c => res.json(200, c));
    }

    function update(req, res) {
        customer.update(req.params.id, req.body.firstName, req.body.lastName)
            .then(c => res.json(200, c));
    }

    function postBill(req, res) {
        customer.addBill(req.params.id, req.body.title, req.body.sum)
            .then(b => res.json(200, b));
    }

    function removeBill(req, res) {
        customer.removeBill(req.params.id, req.params.billId)
            .then(() => res.json(200));
    }
}

module.exports = new CustomerController();
