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

io.on('connection', function(socket)
{

	console.log('New user connected!');
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
	socket.broadcast.emit('newMessage',generateMessage('Admin', 'New user added'));

	socket.on('createMessage', function(msg, callback){
		console.log('createMessage',msg);
		// io.emit('newMessage', generateMessage(msg.from, msg.text));
		socket.broadcast.emit('newMessage', generateMessage(msg.from, msg.text));
		callback('Delieved!');

	});

	socket.on('disconnect', function(){
		console.log('User disconnected');
	});

	
});

server.listen(port, function(){
	console.log('Server is running on port: '+port);
});
