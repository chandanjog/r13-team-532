define(['text!templates/home.tpl', 'ember', 'app', "dispatcher", "controllers/race-controller"], function(homeTemplate, Ember, app, dispatcher) {
  app.HomeView = Ember.View.extend({
    template: Ember.Handlebars.compile(homeTemplate),
    templateName: "home"
  });

  app.HomeController = Ember.ObjectController.extend({
    actions: {
      startRace: function() {
        var self = this;
        return dispatcher.trigger('races.get', '')
          .then(function(result) {
            return self.transitionTo("race", {
              raceQuote: JSON.parse(result).quote
            });
          })
          .fail(function(error) {
            console.log("got error");
            console.log(error);
          });
      }
    }
  });

  app.HomeRoute = Ember.Route.extend();

  return app;
});
