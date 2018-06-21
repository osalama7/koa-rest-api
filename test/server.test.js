process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../server');

describe('server : index', () => {

	describe('GET /', () => {
		it('should return json', (done) => { //todo change this title
			chai.request('http://localhost:3000')
					.get('/')
					.end((err, res) => {
						should.not.exist(err);
						res.status.should.eql(200);
						res.type.should.eql('application/json');
						res.body.message.should.eql('hello, world');
						done();
					});
		});
	});

});