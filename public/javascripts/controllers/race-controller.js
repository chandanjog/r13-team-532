define(["app", "text!templates/race.tpl", "ember", "underscore", "controllers/progresses-controller"], function(app, raceTemplate, Ember, _, progressesController) {

  var isValidKey = function(keyCode) {
    var rejectList = [16, 17, 18, 91, 27, 8];
    return !rejectList.contains(keyCode);
  };

  var charForCode = function(keyCode, shiftKeyStatus) {
    var keyChar = String.fromCharCode(keyCode.replace("U+", "0x"));
    if(shiftKeyStatus) {
      return keyChar;
    }
    return keyChar.toLowerCase();
  };

  app.RaceView = Ember.View.extend({
    templateName: "race",
    template: Ember.Handlebars.compile(raceTemplate),
    classNames: ["no-outline"],
    currentLetter: function() {
      return this.$('#letter_'+this.controller.get("currentPosition")).text();
    },
    updateCurrentPosition: function(newPosition) {
      this.controller.set("currentPosition", newPosition);
      this.$('#letter_' + newPosition).addClass('current');
    },
    keyDown: function(event) {
      if(event.keyCode != 8) return;
      event.stopPropagation();
      event.preventDefault();
    },
    keyUp: function(event){
      if(!isValidKey(event.keyCode) || this.controller.get("completedProgress") >= 100) return;
      var currentPosition = this.controller.get('currentPosition');
      var isCorrectKeyPress = this.controller.isCorrectKey(event.originalEvent.keyIdentifier, event.shiftKey, this.currentLetter());
      this.controller.updateNumberOfErrors(isCorrectKeyPress);
      var classAfterValidation = isCorrectKeyPress ?  "success" : "failure";
      this.$('#letter_' + currentPosition).toggleClass('current ' + classAfterValidation);
      this.updateCurrentPosition(currentPosition + 1);
    },
    didInsertElement: function() {
      this.$('#letter_1').addClass('current');
      return this.$().attr({tabindex: 1}), this.$().focus();
    }
  });

  app.RaceRoute = Ember.Route.extend({

  });

  app.RaceController = Ember.ObjectController.extend({
    raceQuote: "One of the coolest new features of HTML5 is WebSockets, which let us talk to the server without using AJAX requests. In this tutorial, we will review the process of running a WebSocket server in PHP, and then building a client to send and receive messages to it over the WebSocket protocol.",
    needs: ["progresses"],
    capturedText: "",
    currentPosition: 1,
    numberOfErrors: 0,
    userProgresses: [
      {lastCompletedPosition: 10, raceQuote: "aaslfsjfldksfjl"},
      {lastCompletedPosition: 20, raceQuote: "aaslfsjfldksfjl"},
      {lastCompletedPosition: 30, raceQuote: "aaslfsjfldksfjl"},
      {lastCompletedPosition: 40, raceQuote: "aaslfsjfldksfjl"}
    ],
    updateNumberOfErrors: function(isCorrectKeyPress) {
      this.set("numberOfErrors", this.get("numberOfErrors") + (isCorrectKeyPress ? 0 : 1));
    },
    isCorrectKey: function(keyIdentifier, shiftKeyStatus, currentLetter) {
      return charForCode(keyIdentifier, shiftKeyStatus) == currentLetter;
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
    }.property("completedProgress"),
    lastCompletedPosition: function() {
      return this.get("currentPosition") - 1;
    }.property("currentPosition"),
    completedProgress: function() {
      var quoteLength = this.get("raceQuote").length;
      return ((this.get("lastCompletedPosition") / quoteLength) * 100);
    }.property("lastCompletedPosition", "raceQuote"),
    accuracy: function() {
      var lastCompletedPosition = this.get("lastCompletedPosition");
      if(!lastCompletedPosition)
        return 0;
      var percentage = ((lastCompletedPosition - this.get("numberOfErrors")) / lastCompletedPosition) * 100;
      return Math.round(percentage * 100) / 100;
    }.property("numberOfErrors", "lastCompletedPosition")
  });

  return app;
});
