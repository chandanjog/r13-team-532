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
      var currentPlayerProgress = raceController.get("currentPlayerProgress");
      expect(currentPlayerProgress).to.equal("width: 20%");
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
});
