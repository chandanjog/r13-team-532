require.config({
  baseUrl: "javascripts",
  config: {
    text: {
      useXhr: function () {
        return true;
      }
    }
  },
  paths: {
    jquery: 'lib/jquery-2.0.3.min',
    handlebars: 'lib/handlebars-1.0.0',
    ember: 'lib/ember',
    text: 'lib/text-loader-plugin',
    Q: "lib/q",
    underscore: "lib/underscore"
  },
  shim: {
    'ember': {
      deps: ['jquery', 'handlebars'],
      exports: 'Ember'
    },
    underscore: {
      exports: "_"
    }
  }
});

(function () {
  require(["app", "ember", "text!templates/main.tpl"], function(app, Ember, mainTemplate) {
    "use strict";
    app.ApplicationController = Ember.Controller.extend({
    });

    app.ApplicationView = Ember.View.extend({
      template: Ember.Handlebars.compile(mainTemplate),
      templateName: "application"
    });

    app.advanceReadiness();
  });
})();

