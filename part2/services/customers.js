'use strict';

function CustomersService() {
    let indexCounter = 1;
    const inMemoryStorage = {};

    function parseId(idToParse) {
        const id = parseInt(idToParse);

        if (!id || isNaN(id)) {
            throw new Error('No id was given.');
        }

        return id;
    }

    this.all = () => {
        return Object
            .keys(inMemoryStorage)
            .map(key => inMemoryStorage[key]);
    };

    this.get = id => {
        return inMemoryStorage[parseId(id)];
    };

    this.add = (firstName, lastName) => {
        if (!firstName) {
            throw new Error('firstName was not given');
        }

        inMemoryStorage[indexCounter] = {
            id: indexCounter,
            firstName,
            lastName
        };

        return inMemoryStorage[indexCounter++];
    };

    this.remove = id => {
        delete inMemoryStorage[id];
    };

    this.update = (id, firstName, lastName) => {
        if (!this.get(id)) {
            throw new Error(`Customer with id ${id} not found.`);
        }

        const item = inMemoryStorage[id];
        item.firstName = firstName;
        item.lastName = lastName;

        return item;
    };
}

module.exports = new CustomersService();
