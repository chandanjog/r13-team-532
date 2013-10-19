define(["app", "text!templates/main.tpl", "ember"], function(app, mainTemplate, Ember){
	app.RacerView = Ember.View.extend({
		template: Ember.Handlebars.compile(mainTemplate)
	});

	app.RacerController = Ember.ObjectController.extend({});

	return app;
})