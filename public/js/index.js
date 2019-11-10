
var socket = io();

socket.on('connect', function(){
	console.log('Connected to server.');
});
socket.on('disconnect', function(){
	console.log('disconnected from server');
});
 



socket.on('newMessage', function(msg){
	console.log('newMessage',msg);
	var formattedTime = moment(msg.createdAt).format('h:mm a');
	var li = jQuery('<li></li>');
	li.text(msg.from+' '+formattedTime  + ": "+msg.text);
	jQuery('#msg-list').append(li);
});
//+' '+formattedTime 
socket.on('newLocationMessage', (msg)=>{
	var formattedTime = moment(msg.createdAt).format('h:mm a');
	var li  =jQuery('<li></li>');
	var a = jQuery('<a target = "_blank">My current Location</a>');
	li.text(msg.from+' '+formattedTime +": ");
	a.attr('href', msg.url);
	li.append(a);
	jQuery('#msg-list').append(li);
});

jQuery('#message-form').on('submit', function(e){
	e.preventDefault();
	var messagebox = jQuery('[name=message]');
	socket.emit('createMessage', {
		from:'User',
		text:messagebox.val()
	}, function(){
		messagebox.val('');
	} )
});

var geoButton = jQuery('#geo-button');
geoButton.on('click', function(){
	if(!navigator.geolocation){
		return	alert('Your browser does not support geolocation');
	}

	geoButton.attr('disabled', 'disabled');
	geoButton.text('Sending location...');

	navigator.geolocation.getCurrentPosition(function(pos)
	{
		geoButton.removeAttr('disabled');
		geoButton.text('Send location');
		console.log(pos);
		socket.emit('createLocationMessage', {
			lat:pos.coords.latitude,
			long:pos.coords.longitude
		}, function()
		{

		});
	}, function(){
		geoButton.removeAttr('disabled');
		geoButton.text('Send location');
		alert('Unable to fetch location');
	});

});





		