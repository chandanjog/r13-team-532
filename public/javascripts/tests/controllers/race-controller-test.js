describe("RaceController", function() {
  "use strict";
  /*globals it:false, require:false, expect:false */
  var injector;

  beforeEach(function(done) {
    require(["squire"], function(squire) {
      injector = new squire();
      injector.mock("dispatcher", {});
      done();
    });
  });

  it("should spannify the quote text", function(done) {
    injector.require(["app", "controllers/race-controller"], function(app, raceController) {
      var raceController = app.RaceController.create({
        content: {raceQuote: ""}
      });
      raceController.set("raceQuote", "aa b");
      var spannifiedQuote = raceController.get("spannifiedRaceQuote");
      expect(spannifiedQuote).to.equal('<span id="letter_1">a</span><span id="letter_2">a</span><span id="letter_3"> </span><span id="letter_4">b</span>');
      done();
    });
  });

  it("should get current player progress from quote length and current progress", function(done) {
    injector.require(["app", "controllers/race-controller"], function(app, raceController) {
      var raceController = app.RaceController.create({
        content: {raceQuote: ""}
      });
      raceController.set("raceQuote", "aabbccddee");
      raceController.set("currentPosition", 3);
      var completedProgress = raceController.get("completedProgress");
      expect(completedProgress).to.equal(20);
      done();
    });
  });

  it("should get last completed position from current position", function(done) {
    injector.require(["app", "controllers/race-controller"], function(app, raceController) {
      var raceController = app.RaceController.create();
      raceController.set("currentPosition", 5);
      var lastCompletedPosition = raceController.get("lastCompletedPosition");
      expect(lastCompletedPosition).to.equal(4);
      done();
    });
  });

  it("should get completedProgressStyle from current position", function(done) {
    injector.require(["app", "controllers/race-controller"], function(app, raceController) {
      var raceController = app.RaceController.create();
      raceController.set("completedProgress", 5);
      var lastCompletedPosition = raceController.get("completedProgressStyle");
      expect(lastCompletedPosition).to.equal("width: 5%");
      done();
    });
  });

  it("should return accuracy percentage", function(done) {
    injector.require(["app", "controllers/race-controller"], function(app, raceController) {
      var raceController = app.RaceController.create();
      raceController.set("numberOfErrors", 7);
      raceController.set("lastCompletedPosition", 20);
      expect(raceController.get("accuracy")).to.equal(65);
      done();
    });
  });
});
