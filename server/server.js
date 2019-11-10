const path = require('path');
const express = require('express');
const http = require('http');
const {generateMessage, generateLocationMessage} = require('./utils/message.js');
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

	socket.on('disconnect', function()
	{
		socket.broadcast.emit('newMessage',generateMessage('Admin', 'User disconnected'));
		console.log('User disconnected');
	});

	socket.on('createMessage', function(msg, callback)
	{
		console.log('createMessage',msg);
		socket.broadcast.emit('newMessage', generateMessage(msg.from, msg.text));
		socket.emit('newMessage', generateMessage('me',  msg.text));
		callback();

	});

	socket.on('createLocationMessage', function(pos)
	{
			io.emit('newLocationMessage', generateLocationMessage('Admin', pos.lat, pos.long));
		}, function(){
		
	});

	
	
});

server.listen(port, function(){
	console.log('Server is running on port: '+port);
});
