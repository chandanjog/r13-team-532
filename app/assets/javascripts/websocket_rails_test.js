var dispatcher = new WebSocketRails('localhost:3000/websocket');
var race_id;
var player_id;

var success = function (race_raw) {
    console.log(race_raw);
    var race = JSON.parse(race_raw);
    race_id = race["_id"]["$oid"];
    player_id = "guest_" + race["guest_counter"];

    console.log(race_id);
    console.log(player_id);

    var channel = dispatcher.subscribe(race_id);
    channel.bind('updates', function(race) {
        console.log('updated::'+ race);
    });

    dispatcher.trigger('races.update', {'race_id': race_id, 'player_id': player_id, 'progress': 30 }, function(){
        console.log("success....");
    }, function(race){
        console.log("fail....");
    });


}

var failure = function (race) {
    console.log(race);
    console.log('in error');
}

console.log("executing..");
dispatcher.trigger('races.get', '', success, failure);



