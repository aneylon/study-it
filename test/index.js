var expect = require('chai').expect;
var should = require('chai').should();
var assert = require('chai').assert;
// var server = require('../server.js');
var routes = require('../routes');

var request = require('supertest');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

describe("Mocha and Chai Tests", function(){
	it("Expect", function(){
		expect(42).to.be.a("number");
	})

	it("Assert", function(){
		assert.equal(42, 42);
	})

	it("Should", function(){
		[1,2,3].indexOf(2).should.equal(1);
	})
})

xdescribe("Routes", function(){
	it("Get /api/getIt", function(done){
		request(app)
			.get('/api/getIt')
			.end(function(err,res){
				if(err){
					console.log(err);
					return done(err);
				}
				(res.body).should.be.an.instanceOf(String);
				(res.body).should.equal('got it');
				done();
			});
	})

	it("Post to /api/postIt", function(done){
		request(app)
			.post('/api/postIt')
			.send({test: 'test'})
			.end(function(err,res){
				if(err){
					console.log(err);
					return done(err);
				}
				(res.body).should.be.an.instanceOf(String);
				(res.body).should.be.equal('posted it');
				done();
			});
	});

	xit("Post to get a library", function(){

		// router.post('/api/loadLib', function(req, res){
		//   // make post request with name of lib to load {name : 'libName'}
		//   var libName = req.body.name;
		//   console.log('looking for', libName);
		//   // get ref to DB?
		//   // libName.find({}, function(err, results){
		//   //  res.json(results);
		//   // })
		//   res.send('looking for ' + libName);
		// });
	})
})