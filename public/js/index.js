
var socket = io();

socket.on('connect', function(){
	console.log('Connected to server.');
});
socket.on('disconnect', function(){
	console.log('disconnected from server');
});
 



socket.on('newMessage', (msg)=>{
	console.log('newMessage',msg);
	var li = jQuery('<li></li>');
	li.text(msg.from +": "+msg.text);
	jQuery('#msg-list').append(li);
});


jQuery('#message-form').on('submit', function(e){
	e.preventDefault();
	socket.emit('createMessage', {
		from:'User',
		text:jQuery('[name=message]').val()
	}, function(d){
		//console.log(d);
	} )
});
		