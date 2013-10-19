/*globals define:false */

define(["ember"], function(Ember) {
  "use strict";
  /*globals window:false */

  var app = Ember.Application.create();

  app.Router = Ember.Router.extend({enableLogging:true});
  app.Router.map(function () {
    this.resource('home', {path: '/' });
    this.resource('race', {path: '/race'});
  });

  app.deferReadiness();

  window.App = app;
  return app;
});