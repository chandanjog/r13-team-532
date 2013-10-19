define(["app", "text!templates/race.tpl", "ember", "underscore"], function(app, raceTemplate, Ember, _) {
  app.RaceView = Ember.View.extend({
    templateName: "race",
    template: Ember.Handlebars.compile(raceTemplate)
  });

  app.RaceController = Ember.ObjectController.extend({
    raceQuote: "One of the coolest new features of HTML5 is WebSockets, which let us talk to the server without using AJAX requests. In this tutorial, we will review the process of running a WebSocket server in PHP, and then building a client to send and receive messages to it over the WebSocket protocol.",

    spannifiedRaceQuote: function() {
      var spannifiedQuote = _.reduce(this.get('raceQuote'), function(spannifiedQuote, letter){
        return spannifiedQuote += "<span>"+letter+"</span>"
      }, '');
      return spannifiedQuote;
    }.property('raceQuote')
  });

  return app;
})
