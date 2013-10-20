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
            console.log(result);
            var race = JSON.parse(result);
            return self.transitionToRoute("race", {
              raceQuote: race.quote,
              raceId: race["_id"]["$oid"],
              playerId: "guest_" + race["guest_counter"],
              players: race.players
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
