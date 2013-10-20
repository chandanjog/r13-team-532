define(["app", "text!templates/race.tpl", "ember", "underscore"], function(app, raceTemplate, Ember, _) {

  var isValidKey = function(keyCode) {
    var rejectList = [16, 17, 18, 91, 27];
    return !rejectList.contains(keyCode);
  };

  var charForCode = function(keyCode) {
    return String.fromCharCode(keyCode.replace("U+", "0x"));
  };

  app.RaceView = Ember.View.extend({
    templateName: "race",
    template: Ember.Handlebars.compile(raceTemplate),
    currentLetter: function() {
      return this.$('#letter_'+this.controller.get("currentPosition")).text();
    },
    updateCurrentPosition: function(newPosition) {
      this.controller.set("currentPosition", newPosition);
      this.$('#letter_' + newPosition).addClass('current');
    },
    keyUp: function(event){
      if(!isValidKey(event.keyCode) || this.controller.get("completedProgress") >= 100) return;
      var currentPosition = this.controller.get('currentPosition');
      var isCorrectKeyPress = this.controller.isCorrectKey(event.originalEvent.keyIdentifier, this.currentLetter());
      this.controller.updateNumberOfErrors(isCorrectKeyPress);
      var classAfterValidation = isCorrectKeyPress ?  "success" : "failure";
      this.$('#letter_' + currentPosition).toggleClass('current ' + classAfterValidation);
      this.updateCurrentPosition(currentPosition + 1);
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
    numberOfErrors: 0,
    updateNumberOfErrors: function(isCorrectKeyPress) {
      this.set("numberOfErrors", this.get("numberOfErrors") + (isCorrectKeyPress ? 0 : 1));
    },
    isCorrectKey: function(keyIdentifier, currentLetter) {
      console.log(charForCode(keyIdentifier) + " " + currentLetter )
      return charForCode(keyIdentifier) == currentLetter.toUpperCase();
    },
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
    completedProgressStyle: function() {
      return "width: " + this.get("completedProgress") + "%";
    }.property("currentPosition"),
    lastCompletedPosition: function() {
      return this.get("currentPosition") - 1;
    }.property("currentPosition"),
    completedProgress: function() {
      var quoteLength = this.get("raceQuote").length;
      return ((this.get("lastCompletedPosition") / quoteLength) * 100);
    }.property("lastCompletedPosition", "raceQuote")
  });

  return app;
});
