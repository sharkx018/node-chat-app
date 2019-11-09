
var socket = io();

socket.on('connect', function(){
	console.log('Connected to server.');
});
socket.on('disconnect', function(){
	console.log('disconnected from server');
});



// socket.emit('createMessage',{
// 	from:"mukul@gmail.com",
// 	text:"Hello i am mukul!"
// } );


socket.on('newMessage', (msg)=>{
	console.log('newMessage',msg);
});
		