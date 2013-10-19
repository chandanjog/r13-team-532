describe("RaceController", function() {
  it("should spannify the quote text", function(done) {
    require(["app", "controllers/race-controller"], function(app, raceController) {
      var raceController = app.RaceController.create({
      });
      raceController.set("raceQuote", "aa b");
      var spannifiedQuote = raceController.get("spannifiedRaceQuote");
      console.log(spannifiedQuote);
      expect(spannifiedQuote).to.equal('<span id="letter_1">a</span><span id="letter_2">a</span><span id="letter_3"> </span><span id="letter_4">b</span>');
      done();
    });
  });
});
