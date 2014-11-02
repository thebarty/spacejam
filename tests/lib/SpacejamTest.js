// Generated by CoffeeScript 1.8.0
(function() {
  var Spacejam, chai, expect, isCoffee, path, sinon, sinonChai;

  chai = require("chai");

  expect = chai.expect;

  sinon = require("sinon");

  sinonChai = require("sinon-chai");

  chai.use(sinonChai);

  path = require("path");

  isCoffee = require('./isCoffee');

  if (isCoffee) {
    Spacejam = require('../../src/Spacejam');
  } else {
    Spacejam = require('../../lib/Spacejam');
  }

  describe("Sapcejam.coffee", function() {
    var spacejam;
    this.timeout(60000);
    spacejam = null;
    before(function() {});
    beforeEach(function() {
      delete process.env.PORT;
      delete process.env.ROOT_URL;
      delete process.env.MONGO_URL;
      delete process.env.PACKAGE_DIRS;
      return spacejam = new Spacejam();
    });
    return describe("testInVelocity", function() {
      it("should call testPackages with the correct options", function() {
        var expectedOptions, stub;
        stub = sinon.stub(spacejam, 'testPackages');
        expectedOptions = {
          'driver-package': "spacejamio:test-in-velocity",
          timeout: 0,
          'phantomjs-script': 'phantomjs-test-in-velocity'
        };
        spacejam.testInVelocity();
        return expect(stub).to.have.been.calledWithExactly(expectedOptions);
      });
      it("should set VELOCITY_URL to http://localhost:3000/ by default", function() {
        var stub;
        stub = sinon.stub(spacejam, 'testPackages');
        spacejam.testInVelocity();
        return expect(process.env.VELOCITY_URL).to.equal("http://localhost:3000/");
      });
      it("should set VELOCITY_URL to ROOT_URL", function() {
        var stub;
        stub = sinon.stub(spacejam, 'testPackages');
        process.env.ROOT_URL = "http://vm:4000";
        spacejam.testInVelocity();
        return expect(process.env.VELOCITY_URL).to.equal("http://vm:4000");
      });
      it("should set VELOCITY_URL to options.velocity-url", function() {
        var stub;
        stub = sinon.stub(spacejam, 'testPackages');
        spacejam.testInVelocity({
          "velocity-url": "http://vm:3000"
        });
        return expect(process.env.VELOCITY_URL).to.equal("http://vm:3000");
      });
      return it("should run Phantomjs with the correct arguments", function(done) {
        var options, spy;
        process.env.PACKAGE_DIRS = path.resolve(__dirname, '../../packages');
        process.chdir(path.resolve(__dirname, '../apps/leaderboard'));
        options = {
          packages: ['success']
        };
        spacejam.testInVelocity(options);
        spy = sinon.spy(spacejam.phantomjs, 'run');
        return spacejam.meteor.on("ready", (function(_this) {
          return function() {
            var err;
            try {
              log.debug('SpacejamTest on meteor ready');
              expect(spy).to.have.been.calledWith('http://localhost:4096/', 'phantomjs-test-in-velocity');
              return done();
            } catch (_error) {
              err = _error;
              return done(err);
            }
          };
        })(this));
      });
    });
  });

}).call(this);
