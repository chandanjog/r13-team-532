define(["app", "text!templates/race.tpl", "ember", "underscore"], function(app, raceTemplate, Ember, _) {

  var isValidKey = function(keyCode) {
    var rejectList = [16, 17, 18, 91, 27];
    console.log(keyCode);
/*    if(keyCode == 32) return true;
    if(keyCode >= 48 && keyCode <= 57) return true;
    if(keyCode < 65 || keyCode > 90 ) return false;
    return true;*/
    return !rejectList.contains(keyCode);
  };

  app.RaceView = Ember.View.extend({
    templateName: "race",
    template: Ember.Handlebars.compile(raceTemplate),
    keyUp: function(event){
      if(!isValidKey(event.keyCode)) return;
      var currentPosition = this.controller.get('currentPosition');
      var currentElement = this.$('#letter_'+currentPosition);
      var classAfterValidation = String.fromCharCode(event.keyCode) == currentElement.text().toUpperCase() ? "success" : "failure"
      this.$('#letter_'+currentPosition).toggleClass('current '+classAfterValidation);
      this.controller.set("currentPosition", currentPosition + 1);
      currentPosition = this.controller.get('currentPosition');
      this.$('#letter_'+currentPosition).addClass('current');
    },
    didInsertElement: function() {
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
    }.property('raceQuote')
  });

  return app;
})
