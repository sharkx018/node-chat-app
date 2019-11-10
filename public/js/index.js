
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

socket.on('newLocationMessage', (msg)=>{
	var li  =jQuery('<li></li>');
	var a = jQuery('<a target = "_blank">My current Location</a>');
	li.text(msg.from+": ");
	a.attr('href', msg.url);
	li.append(a);
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

var geoButton = jQuery('#geo-button');
geoButton.on('click', function(){
	if(!navigator.geolocation){
		return	alert('Your browser does not support geolocation');
	}

	navigator.geolocation.getCurrentPosition(function(pos){
		console.log(pos);
		socket.emit('createLocationMessage', {
			lat:pos.coords.latitude,
			long:pos.coords.longitude
		}, function(){

		});
	}, function(){
		alert('Unable to fetch location');
	});

});





		