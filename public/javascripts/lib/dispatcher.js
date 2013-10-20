define(["app", "Q"], function(app, Q) {
  (function() {
    app.dispatcher = new WebSocketRails(window.location.host + '/websocket');
  })();

  var trigger = function(message, body) {
    var deferred = Q.defer();
    app.dispatcher.trigger(message, body, deferred.resolve, deferred.reject);
    return deferred.promise;
  };

  return {
    trigger: trigger,
    subscribe: app.dispatcher.subscribe
  };
});
