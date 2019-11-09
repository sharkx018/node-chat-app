const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = process.env.PORT || 3001;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use( express.static(path.join(__dirname,'/../public')));

io.on('connection', function(socket){
	console.log('New user connected!');

	socket.on('disconnect', function(){
		console.log('User disconnected');
	});

	
	
	socket.on('createMessage', function(msg){
		console.log(' createMessage',msg);

		io.emit('newMessage', {
			from:msg.from,
			text:msg.text,
			createdAt:new Date().getTime()
		});


	});

	// socket.emit('newMessage', {
	// 	from:"server@gmail.com",
	// 	text:"hello this is reply",
	// 	createdAt: new Date().getTime()
	// });



});

server.listen(port, function(){
	console.log('Server is running on port: '+port);
});
