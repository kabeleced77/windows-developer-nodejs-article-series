'use strict';

const chai = require('chai'),
    Server = require('../server'),
    customerService = require('../services/customer'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    chaiHttp = require('chai-http');

const expect = chai.expect;
chai.use(sinonChai);
chai.use(chaiHttp);

describe('CustomerController', function () {
    describe('Integration Tests', function () {
        let getByIdStub;

        before(() => {
            getByIdStub = sinon.stub(customerService, 'get', () => {
                return Promise.resolve({
                    unit: 'test'
                });
            });
        });

        after(() => {
            getByIdStub.restore();
        });

        it('adds the routes to the server and calls the service correctly', function (done) {
            const server = new Server();

            server.start();

            chai.request('http://localhost:8000')
                .get('/customer/1')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body.unit).to.equal('test');
                    expect(getByIdStub).to.have.been.calledOnce;

                    done();
                });
        });
    });
});
