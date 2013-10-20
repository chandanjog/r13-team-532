define(["ember", "app", "text!templates/progress.tpl"], function(Ember, app, progressTemplate) {
  app.ProgressView = Ember.View.extend({
    templateName: "progress",
    template: Ember.Handlebars.compile(progressTemplate)
  });

  app.ProgressController = Ember.ObjectController.extend();
});
