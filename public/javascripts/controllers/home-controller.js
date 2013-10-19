define(['text!templates/home.tpl', 'ember', 'app'], function(homeTemplate, Ember, app) {
  app.HomeView = Ember.View.extend({
    template: Ember.Handlebars.compile(homeTemplate),
    templateName: "home"
  });

  app.HomeController = Ember.ObjectController.extend({});

  return app;
});