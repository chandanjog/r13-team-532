define(["app", "text!templates/race.tpl", "ember", "underscore"], function(app, raceTemplate, Ember, _) {

  var isValidKey = function(keyCode) {
    var rejectList = [16, 17, 18, 91, 27];
    return !rejectList.contains(keyCode);
  };

  var charForCode = function(keyCode) {
    return String.fromCharCode(keyCode.replace("U+", "0x"));
  };

  var classForCurrentCharacter =  function(keyIdentifier, currentLetter) {
    return charForCode(keyIdentifier) == currentLetter.toUpperCase() ? "success" : "failure";
  };

  app.RaceView = Ember.View.extend({
    templateName: "race",
    template: Ember.Handlebars.compile(raceTemplate),
    keyUp: function(event){
      if(!isValidKey(event.keyCode)) return;
      var currentPosition = this.controller.get('currentPosition');
      var classAfterValidation = classForCurrentCharacter(event.originalEvent.keyIdentifier, this.$('#letter_'+currentPosition).text());
      this.$('#letter_' + currentPosition).toggleClass('current ' + classAfterValidation);
      var newPosition = currentPosition + 1;
      this.controller.set("currentPosition", newPosition);
      this.$('#letter_' + newPosition).addClass('current');
    },
    didInsertElement: function() {
      this.$('#letter_1').addClass('current');
      return this.$().attr({ tabindex: 1 }), this.$().focus();
    }
  });

  app.RaceController = Ember.ObjectController.extend({
    raceQuote: "One of the coolest new features of HTML5 is WebSockets, which let us talk to the server without using AJAX requests. In this tutorial, we will review the process of running a WebSocket server in PHP, and then building a client to send and receive messages to it over the WebSocket protocol.",
    capturedText: "",
    currentPosition: 1,
    spannifiedRaceQuote: function() {
      var spannifiedQuote = _.reduce(this.get('raceQuote'), function(spannifiedQuote, letter){
        var currentLetterPosition = spannifiedQuote.letterPosition + 1;
        return {
          letterPosition: currentLetterPosition,
          quote: spannifiedQuote.quote += '<span id="letter_' + currentLetterPosition +'">' + letter + '</span>'
        };
      }, {quote: '', letterPosition: 0});
      return spannifiedQuote.quote;
    }.property('raceQuote'),
    currentPlayerProgress: function() {
      var quoteLength = this.get("raceQuote").length;
      return "width: " + ((this.get("lastCompletedPosition") / quoteLength) * 100) + "%";
    }.property("currentPosition"),
    lastCompletedPosition: function() {
      return this.get("currentPosition") - 1;
    }.property("currentPosition")
  });

  return app;
});
