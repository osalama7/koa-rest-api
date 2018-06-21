process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../server');

describe('routes : test', () => {

	describe('GET /test', () => {
		it('should return json', (done) => {
			chai.request('http://localhost:3000/test')
					.get('/')
					.end((err, res) => {
						should.not.exist(err);
						res.status.should.eql(200);
						res.type.should.eql('application/json');
						done();
					});
		});
	});

});