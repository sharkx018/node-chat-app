const path = require('path');
const express = require('express');
const http = require('http');
const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validator.js');
const socketIO = require('socket.io');

const port = process.env.PORT || 3001;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
const {Users} = require('./utils/users.js');
var users = new Users();

app.use( express.static(path.join(__dirname,'/../public')));

io.on('connection', function(socket)
{

	console.log('New user connected!');
	socket.on('disconnect', function()
	{
		var user = users.removeUser(socket.id);
		if(user){
			io.to(user.room).emit('updatedUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', user.name+' has left'));
		}
		
		console.log('User disconnected');
	});

	socket.on('createMessage', function(msg, callback)
	{
		var user = users.getUser(socket.id);
		if(user && isRealString(msg.text)){
			console.log('createMessage',msg);
			socket.broadcast.to(user.room).emit('newMessage', generateMessage(user.name, msg.text));
			socket.emit('newMessage', generateMessage('me',  msg.text));
			
		}
		callback();
		

	});

	socket.on('createLocationMessage', function(pos)
	{
		var user = users.getUser(socket.id);
		if(user){
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, pos.lat, pos.long));
		}
	});

	socket.on('join', function(param, callback)
	{
		if(!isRealString(param.name) || !isRealString(param.room))
		{
			return callback('Invalid Data!');
		}
		socket.join(param.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, param.name, param.room);
		io.to(param.room).emit('updatedUserList', users.getUserList(param.room));
		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
		socket.broadcast. to(param.room).emit('newMessage',generateMessage('Admin', param.name+' has added'));
		callback();
		//socket.leave()
		//io.to('the chat room').emit() // to all in room
		//socket.broadcast.to('the chat room').emit() // to all except one
		
	});

	
	
});

server.listen(port, function(){
	console.log('Server is running on port: '+port);
});





