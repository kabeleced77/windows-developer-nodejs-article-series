'use strict';

const chai = require('chai'),
    Server = require('./index'),
    database = require('../database'),
    controllers = require('../controllers'),
    restify = require('restify'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai');

const expect = chai.expect;
chai.use(sinonChai);

describe('Server', function () {
    it('exports a functions', function () {
        expect(Server).to.be.a('function');
    });

    describe('addRoute', function () {
        let server;

        beforeEach(function () {
            server = new Server();
        });

        it('should throw an error when no route is given', function () {
            const action = () => server.addRoute();

            expect(action).to.throw('Parameter route is mandatory');
        });

        it('should throw an error when no callback is given', function () {
            const action = () => server.addRoute('sample');

            expect(action).to.throw('Parameter callback is mandatory');
        });
    });

    describe('start', function () {
        it('starts the server correctly', function () {
            const corsStub = sinon.stub(restify, 'CORS');
            const queryParserStub = sinon.stub(restify, 'queryParser');
            const bodyParserStub = sinon.stub(restify, 'bodyParser');
            const listenSpy = sinon.spy();
            const preSpy = sinon.spy();
            const useSpy = sinon.spy();
            const databaseStub = sinon.stub(database, 'configure');
            const controllersStub = sinon.stub(controllers, 'forEach');
            const createServerStub = sinon.stub(restify, 'createServer', () => {
                return {
                    pre: preSpy,
                    use: useSpy,
                    listen: listenSpy
                }
            });

            try {
                const server = new Server();
                server.start();

                expect(listenSpy).to.be.calledOnce;
                expect(preSpy).to.be.calledOnce;
                expect(useSpy).to.be.calledThrice;
                expect(corsStub).to.be.calledOnce;
                expect(queryParserStub).to.be.calledOnce;
                expect(bodyParserStub).to.be.calledOnce;
                expect(databaseStub).to.be.calledWith(sinon.match.string);
                expect(controllersStub).to.be.calledOnce;
            }
            finally {
                createServerStub.restore();
                databaseStub.restore();
                controllersStub.restore();
                corsStub.restore();
                queryParserStub.restore();
                bodyParserStub.restore();
            }
        });
    });
});
