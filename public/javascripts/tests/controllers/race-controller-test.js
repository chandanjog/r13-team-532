describe("RaceController", function() {
  it("should spannify the quote text", function(done) {
    require(["app", "controllers/race-controller"], function(app, raceController) {
      var raceController = app.RaceController.create({
      });
      raceController.set("raceQuote", "aa b");
      var spannifiedQuote = raceController.get("spannifiedRaceQuote");
      console.log(spannifiedQuote);
      expect(spannifiedQuote).to.equal("<span>a</span><span>a</span><span> </span><span>b</span>");
      done();
    });
  });
});
