//$.ready(function(){
    var dispatcher = new WebSocketRails('localhost:3000/websocket');

    var success = function (race) {
        console.log(race);
    }

    var failure = function (race) {
        console.log(race);
        console.log('in error');
    }

    console.log("executing..");
    dispatcher.trigger('races.get', '' , success, failure);

    console.log(dispatcher.trigger('races.get'));
//});



//channel = dispatcher.subscribe('race_1');
//channel.bind('new', function(post) {
//    console.log('a new post about '+ post +' arrived!');
//});


