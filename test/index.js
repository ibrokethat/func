var assert  = require("assert");
var sinon   = require("sinon");
var func    = require("../func");
var partial = func.partial;
var bind    = func.bind;
var compose = func.compose;
var fakes;

var expect = require('chai').expect;


describe("test func module: ", function() {


  beforeEach(function() {

    fakes = sinon.sandbox.create();

  });

  afterEach(function() {

    fakes.restore();

  });


  describe("function bind", function() {

    it("should bind a function to a scope object", function() {

      var o = {
        prop: "test"
      };

      function f() {
        return this.prop;
      }

      assert.equal(undefined, f());

      f = bind(o, f);

      assert.equal(o.prop, f());

    });

    it("should bind parameters to a function", function() {

      function f (p1, p2) {
        return p1;
      };

      assert.equal(undefined, f());

      f = bind({}, f, "test");

      assert.equal("test", f());

    });

    it("should append parameters to any bound ones", function() {

      function f (p1, p2) {
        return p1 + p2;
      };

      f = bind({}, f, 10);

      assert.equal(30, f(20));

    });


  });

  describe("function partial", function() {


    it("should bind parameters to a function", function() {

      var p;

      function f (p1, p2) {
        return p1;
      };

      p = partial(f, "test");

      assert.equal("test", p());

    });

    it("should append parameters to any bound ones", function() {

      var p;

      function f (p1, p2) {
        return p1 + p2;
      };

      p = partial(f, 10);

      assert.equal(30, p(20));

    });


  });


  describe("function compose", function() {

    var f1, f2;

    beforeEach(function() {

      f1 = function(a) {return a + a;};
      f2 = function(a) {return a * a;};
    });

    afterEach(function() {

      f1 = null;
      f2 = null;

    });

    it("should create a function composed of other functions", function() {
      //  2 4 8 16 32
      var func = compose(f1, f1, f1, f1, f1);

      expect(func(1)).to.be.equal(32);

    });

    it("should create a function composed of other functions", function() {

      var func = compose(f1, f2);

      expect(func(10)).to.be.equal(200);

    });

    it("should throw an error if passed a non function", function() {

      assert.throws(function() {
        compose({});
      });

    });



  });


});
