var expect = require('chai').expect;
var should = require('chai').should();
var assert = require('chai').assert;
// var server = require('../server.js');
var routes = require('../routes');

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
	it("Get It", function(){
		expect(routes.getIt).to.be.a('function');
		expect(routes.getIt()).to.equal("GET IT");
		expect(routes.getIt()).to.be.a('string');
	})

	it("Post It", function(){
		assert.equal(routes.postIt(),"Posted");
		routes.postIt().should.equal("Posted");
		routes.postIt.should.be.a("function");
		routes.postIt().should.be.a("string");
	})

	it("Some Thing", function(){
		assert.equal(routes.someThing(),"Nothing");
		assert.typeOf(routes.someThing,"function");
		assert.typeOf(routes.someThing(),"string");
	})
})