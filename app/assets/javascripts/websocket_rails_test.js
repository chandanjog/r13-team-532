    var dispatcher = new WebSocketRails('localhost:3000/websocket');

    channel = dispatcher.subscribe('race_1');
    channel.bind('update', function(post) {
        console.log('a new progress for race '+ post);
    });

