define(["ember", "app", "controllers/progress-controller", "text!templates/progresses.tpl"], function(Ember, app, progressController,progressesTemplate) {

  app.ProgressesView = Ember.View.extend({
    templateName: "progresses",
    template: Ember.Handlebars.compile(progressesTemplate)
  });

  app.ProgressesController = Ember.ArrayController.extend();

  return app;
});
