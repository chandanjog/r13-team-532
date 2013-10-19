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
    mocha: 'lib/mocha',
    jquery: 'lib/jquery-2.0.3.min',
    handlebars: 'lib/handlebars-1.0.0',
    ember: 'lib/ember',
    text: 'lib/text-loader-plugin',
    Q: "lib/q",
    underscore: "lib/underscore",
    testList: "tests/test-list",
    squire: "lib/squire/squire",
    sinon: "lib/sinon/sinon"
  },
  shim: {
    mocha: {
      exports: "mocha",
      init: function () {
        mocha.setup("bdd");
        mocha.setup({
          ignoreLeaks: true
        });
      }
    },
    sinon: {
      exports: "sinon"
    },
    'ember': {
      deps: ['jquery', 'handlebars'],
      exports: 'Ember'
    },
    underscore: {
      exports: "_"
    }
  }
});

require(["mocha", "testList", "jquery"], function (mocha, testFiles, $) {
  "use strict";
  /*globals mochaPhantomJS:false , document:false, require:false, mocha:false */
  require($.map(testFiles, function (value, index) {
    return "javascripts/tests/" + value;
  }), function () {
    window.cordova = {
      exec: function (successCallback) {
        if (successCallback) successCallback();
      }
    };
    if (window.mochaPhantomJS) {
      document.dispatchEvent = function () {};
      window.CustomEvent = function () {
        return "";
      };
      mochaPhantomJS.run();
      return;
    }
    mocha.run();
  });
});
