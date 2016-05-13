var expect = require('chai').expect;
var should = require('chai').should();
var assert = require('assert');
// var server = require('../server.js');

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