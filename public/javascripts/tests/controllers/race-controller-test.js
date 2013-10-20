describe("RaceController", function() {
  "use strict";
  /*globals it:false, require:false, expect:false */

  it("should spannify the quote text", function(done) {
    require(["app", "controllers/race-controller"], function(app, raceController) {
      var raceController = app.RaceController.create();
      raceController.set("raceQuote", "aa b");
      var spannifiedQuote = raceController.get("spannifiedRaceQuote");
      expect(spannifiedQuote).to.equal('<span id="letter_1">a</span><span id="letter_2">a</span><span id="letter_3"> </span><span id="letter_4">b</span>');
      done();
    });
  });

  it("should get current player progress from quote length and current progress", function(done) {
    require(["app", "controllers/race-controller"], function(app, raceController) {
      var raceController = app.RaceController.create();
      raceController.set("raceQuote", "aabbccddee");
      raceController.set("currentPosition", 3);
      var completedProgress = raceController.get("completedProgress");
      expect(completedProgress).to.equal(20);
      done();
    });
  });

  it("should get last completed position from current position", function(done) {
    require(["app", "controllers/race-controller"], function(app, raceController) {
      var raceController = app.RaceController.create();
      raceController.set("currentPosition", 5);
      var lastCompletedPosition = raceController.get("lastCompletedPosition");
      expect(lastCompletedPosition).to.equal(4);
      done();
    });
  });

  it("should get completedProgressStyle from current position", function(done) {
    require(["app", "controllers/race-controller"], function(app, raceController) {
      var raceController = app.RaceController.create();
      raceController.set("completedProgress", 5);
      var lastCompletedPosition = raceController.get("completedProgressStyle");
      expect(lastCompletedPosition).to.equal("width: 5%");
      done();
    });
  });

  describe("validate key", function() {
    it("should match from charcode of currentKey and expectedKey", function(done) {
      require(["app", "controllers/race-controller"], function(app, raceController) {
        var raceController = app.RaceController.create();
        var isCorrect = raceController.isCorrectKey("U+0045", true, "E");
        expect(isCorrect).to.be.true;
        done();
      });
    });

    it("should be case sensitivity", function(done) {
      require(["app", "controllers/race-controller"], function(app, raceController) {
        var raceController = app.RaceController.create();
        var isCorrect = raceController.isCorrectKey("U+0045", false, "e");
        expect(isCorrect).to.be.true;
        done();
      });
    });

    it("should return false is characters does not match", function(done) {
      require(["app", "controllers/race-controller"], function(app, raceController) {
        var raceController = app.RaceController.create();
        var isCorrect = raceController.isCorrectKey("U+0045", false, "g");
        expect(isCorrect).to.be.false;
        done();
      });
    });
  });

  it("should return accuracy percentage", function(done) {
    require(["app", "controllers/race-controller"], function(app, raceController) {
      var raceController = app.RaceController.create();
      raceController.set("numberOfErrors", 7);
      raceController.set("lastCompletedPosition", 20);
      expect(raceController.get("accuracy")).to.equal(65);
      done();
    });
  });
});
