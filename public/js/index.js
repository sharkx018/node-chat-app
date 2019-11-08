
var socket = io();
socket.on('connect', ()=>{
	console.log('Connected to server.');


	// socket.emit('createEmail', {
	// 		to:"client@gmail.com",
	// 		text:"I am client. ",
			
	// 	});
});

socket.on('disconnect', ()=>{
	console.log('disconnected from server');
});

socket.on('newEmail', (email)=>{
	console.log('New Email', email);
});

socket.emit('createMessage',{
	from:"mukul@gmail.com",
	text:"Hello i am mukul!"
} );


socket.on('newMessage', (msg)=>{
	console.log('newMessage',msg);
});
		