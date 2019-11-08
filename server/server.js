const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = process.env.PORT || 3001;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use( express.static(path.join(__dirname,'/../public')));

io.on('connection', (socket)=>{
	console.log('New user connected!');

	socket.on('disconnect', ()=>{
		console.log('User disconnected');
	});

	socket.on('createEmail', (email)=>{
		console.log('Create Email', email);
	});

	// socket.emit('newEmail', {
	// 	from:"server@gmail.com",
	// 	text:"Hey i am server ",
	// 	createdAt:123
	// });

	socket.on('createMessage', (msg)=>{
		console.log(' createMessage',msg);
	});
	
	socket.emit('newMessage', {
		from:"server@gmail.com",
		text:"hello this is reply",
		createdAt: new Date().getTime()
	});



});

server.listen(port, ()=>{
	console.log('Server is running on port: '+port);
});
