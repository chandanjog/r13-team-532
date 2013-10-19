define(['text!templates/home.tpl', 'ember', 'app', "controllers/race-controller"], function(homeTemplate, Ember, app) {
  app.HomeView = Ember.View.extend({
    template: Ember.Handlebars.compile(homeTemplate),
    templateName: "home"
  });

  app.HomeController = Ember.ObjectController.extend({
    actions: {
      startRace: function() {
        this.transitionToRoute("race");
      }
    }
  });

  app.HomeRoute = Ember.Route.extend();

  return app;
});