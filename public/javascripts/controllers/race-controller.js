define(["app", "text!templates/race.tpl", "ember", "underscore", "controllers/progresses-controller", "dispatcher"], function(app, raceTemplate, Ember, _, progressesController, dispatcher) {

  var isValidKey = function(keyCode) {
    var rejectList = [16, 17, 18, 91, 27, 8];
    return !rejectList.contains(keyCode);
  };

  app.RaceView = Ember.View.extend({

    templateName: "race",

    template: Ember.Handlebars.compile(raceTemplate),

    classNames: ["no-outline"],

    currentLetter: function() {
      return this.$('#letter_'+this.controller.get("currentPosition")).text();
    },

    updateCurrentPosition: function(newPosition) {
      this.controller.set("currentPosition", newPosition);
      this.$('#letter_' + newPosition).addClass('current');
    },

    keyDown: function(event) {
      if(event.keyCode != 8) return;
      event.stopPropagation();
      event.preventDefault();
    },

    keyPress: function(event){
      if(!isValidKey(event.charCode) || this.controller.get("completedProgress") >= 100) return;
      var currentPosition = this.controller.get('currentPosition');
      var isCorrectKeyPress = String.fromCharCode(event.charCode) == this.currentLetter();
      this.controller.updateNumberOfErrors(isCorrectKeyPress);
      var classAfterValidation = isCorrectKeyPress ?  "success" : "failure";
      this.$('#letter_' + currentPosition).toggleClass('current ' + classAfterValidation);
      this.updateCurrentPosition(currentPosition + 1);
      this.controller.syncProgress();
    },

    didInsertElement: function() {
      this.$('#letter_1').addClass('current');
      return this.$().attr({tabindex: 1}), this.$().focus();
    }
  });

  app.RaceController = Ember.ObjectController.extend({

    capturedText: "",

    currentPosition: 1,

    numberOfErrors: 0,

    updateNumberOfErrors: function(isCorrectKeyPress) {
      this.set("numberOfErrors", this.get("numberOfErrors") + (isCorrectKeyPress ? 0 : 1));
    },

    spannifiedRaceQuote: function() {
      var spannifiedQuote = _.reduce(this.get('raceQuote'), function(spannifiedQuote, letter){
        var currentLetterPosition = spannifiedQuote.letterPosition + 1;
        return {
          letterPosition: currentLetterPosition,
          quote: spannifiedQuote.quote += '<span id="letter_' + currentLetterPosition +'">' + letter + '</span>'
        };
      }, {quote: '', letterPosition: 0});
      return spannifiedQuote.quote;
    }.property('raceQuote'),

    completedProgressStyle: function() {
      return "width: " + this.get("completedProgress") + "%";
    }.property("completedProgress"),

    lastCompletedPosition: function() {
      return this.get("currentPosition") - 1;
    }.property("currentPosition"),

    completedProgress: function() {
      var quoteLength = this.get("raceQuote").length;
      return ((this.get("lastCompletedPosition") / quoteLength) * 100);
    }.property("lastCompletedPosition", "raceQuote"),

    accuracy: function() {
      var lastCompletedPosition = this.get("lastCompletedPosition");
      if(!lastCompletedPosition)
        return 0;
      var percentage = ((lastCompletedPosition - this.get("numberOfErrors")) / lastCompletedPosition) * 100;
      return Math.round(percentage * 100) / 100;
    }.property("numberOfErrors", "lastCompletedPosition"),

    updateProgress: function(updates) {
      var otherPlayers = _(updates.players).pairs().map(function(x) {
        var progress = x[1];
        progress.playerId = x[0];
        return progress;
      });
      return otherPlayers;
    },

    syncProgress: function() {
      console.log("synching progress");
      return dispatcher.trigger('races.update', {'race_id': this.get("race_id"), 'player_id': this.get("playerId"), 'progress': this.get("completedProgress") });
    }
  });

  app.RaceRoute = Ember.Route.extend({

    setupController: function(controller, model) {
      this._super(controller, model);

      var otherPlayers = controller.updateProgress(model);
      controller.set('userProgresses', otherPlayers);

      var channel = dispatcher.subscribe(model.race_id);
      channel.bind('updates', function(updates){
        console.log("updating the player progress.....");
        console.log(updates);
        var otherPlayers = controller.updateProgress(updates);
        controller.set('userProgresses', otherPlayers);
      });
    },

   serialize: function(model){
     return model;
   }


//   model: function(params){
//     return nil;
//   }
  });

  return app;
});
