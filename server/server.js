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

	socket.emit('newMessage', {
		from:"Admin",
		text:"Welcome to the chat app from admin"
	})
	socket.broadcast.emit('newMessage',{
		from:"Admin",
		text:"New User added!"
	});

	socket.on('createMessage', function(msg){
		console.log('createMessage',msg);

		// io.emit('newMessage', {
		// 	from:msg.from,
		// 	text:msg.text,
		// 	createdAt:new Date().getTime()
		// });

		socket.broadcast.emit('newMessage', {
			from: msg.from,
			text: msg.text,
			createdAt: new Date().getTime()
		});


	});

	socket.on('disconnect', function(){
		console.log('User disconnected');
	});

	// socket.on('add', function(msg){
	// 	console.log("New User ", msg.name);

	// 	socket.broadcast.emit('newMessage', {
	// 		text:msg.name +' added!'
	// 	});

	// 	socket.emit('newMessage',{
	// 		text:'Welcome '+ msg.name+' !'
	// 	});

	// });

	// socket.emit('newMessage', {
	// 	from:"server@gmail.com",
	// 	text:"hello this is reply",
	// 	createdAt: new Date().getTime()
	// });



});

server.listen(port, function(){
	console.log('Server is running on port: '+port);
});
