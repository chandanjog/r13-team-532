var dispatcher = new WebSocketRails('localhost:3000/websocket');
console.log(dispatcher.trigger("races.create"));

