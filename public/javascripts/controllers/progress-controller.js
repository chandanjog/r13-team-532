define(["ember", "app", "text!templates/progress.tpl", "underscore"], function(Ember, app, progressTemplate, _) {

  app.ProgressView = Ember.View.extend({
    templateName: "progress",
    template: Ember.Handlebars.compile(progressTemplate)
  });

  app.ProgressController = Ember.ObjectController.extend({

    progressPercentage: function(){
      var x = _.template("width:<%=progress%>%")({progress: this.get('progress')});
      console.log(x);
      return x;
    }.property('progress')

  });
});
