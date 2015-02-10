var request = require('supertest');
var app = require('./app');
var mongoose = require('mongoose');

describe('Requests to the root path', function(){

	it('Returns a 200 status code', function(done){

		request(app)
		.get('/')
		.expect(200, done);
	});

	it('Returns a HTML format', function(done){

		request(app)
		.get('/')
		.expect('Content-Type', /html/, done);

	});
});

describe('Lists stamps on /stamps', function(){

	it('Returns a 200 status code', function(done){

		request(app)
		.get('/stamps')
		.expect(200, done);
	});

	it('Returns a JSON format', function(done){

		request(app)
		.get('/stamps')
		.expect('Content-Type', /json/, done);
		
	});
});

describe('Create new anonymous stamp', function(){
	it('Returns a 201 status code', function(done){

		request(app)
			.post('/stamps')
			.expect(201, done);
	});

	it('Returns the user name', function(done){

		request(app)
			.post('/stamps')
			.expect(/Anonymous/i, done);
	});
});

describe('Create new stamp', function(){
	it('Returns a 201 status code', function(done){

		request(app)
			.post('/stamps')
			.expect(201, done);
	});

	it('Returns the user name', function(done){

		request(app)
			.post('/stamps')
			.send('user=Brown&location=Yellow')
			.expect(/Brown/i, done);
	});
});
