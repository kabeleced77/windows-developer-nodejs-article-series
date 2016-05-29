'use strict';

const database = require('../database');

function CustomerService() {
    function parseId(idToParse) {
        const id = parseInt(idToParse);

        if (!id || isNaN(id)) {
            throw new Error('No id was given.');
        }

        return id;
    }

    this.all = () => {
        return database.get()
            .then(db => db.models.customer.findAll({
                include: [
                    {
                        model: db.models.bill
                    }
                ]
            }));
    };

    this.get = id => {
        return database.get()
            .then(db => db.models.customer.findById(parseId(id), {
                include: [
                    {
                        model: db.models.bill
                    }
                ]
            }));
    };

    this.add = (firstName, lastName) => {
        return database.get()
            .then(db => db.models.customer.create({
                firstName, lastName
            }));
    };

    this.remove = id => {
        return this.get(id)
            .then(model => model.destroy());
    };

    this.update = (id, firstName, lastName) => {
        return this.get(id)
            .then(model => model.update({
                    firstName, lastName
                })
            );
    };

    this.addBill = (customerId, billTitle, billSum) => {
        return database.get()
            .then(db => Promise.all([
                this.get(customerId),
                db.models.bill.create({
                    title: billTitle,
                    sum: billSum
                })
            ]))
            .then(results => {
                results[0].addBill(results[1]);
                return results[1];
            });
    };

    this.removeBill = (customerId, billId) => {
        return database.get()
            .then(db =>
                Promise.all([
                    this.get(customerId),
                    db.models.bill.findById(billId)
                ]))
            .then(results => {
                results[0].removeBill(results[1]);
                results[1].destroy();
            });
    };
}

module.exports = new CustomerService();
