const path = require('path');
const express = require('express');
const http = require('http');
const {generateMessage} = require('./utils/message.js');
const socketIO = require('socket.io');

const port = process.env.PORT || 3001;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use( express.static(path.join(__dirname,'/../public')));

io.on('connection', function(socket){
	console.log('New user connected!');

	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
	socket.broadcast.emit('newMessage',generateMessage('Admin', 'New user added to the chat app'));

	socket.on('createMessage', function(msg){
		console.log('createMessage',msg);

		// io.emit('newMessage', {
		// 	from:msg.from,
		// 	text:msg.text,
		// 	createdAt:new Date().getTime()
		// });

		socket.broadcast.emit('newMessage', generateMessage(msg.from, msg.text));


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
