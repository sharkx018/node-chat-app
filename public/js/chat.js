
var socket = io();

socket.on('connect', function(){
	var param = jQuery.deparam(window.location.search);
	console.log(param);

	socket.emit('join', param, function(err){
		if(err){
			alert(err);
			window.location.href = '/';
		}else{
			console.log('No errors');

		}

	});

});


socket.on('updatedUserList', function(userList){
	//console.log(userList);
	var ol = jQuery('<ol></ol>');
	userList.forEach(function(user){
		ol.append(jQuery('<li></li>').text(user));
	});
	jQuery('#users').html(ol);

});

socket.on('disconnect', function(){
	console.log('disconnected from server');
});
 
function scrollToBottom() {
	//Selector
 	var messages = jQuery('#msg-list');
 	var newMessage = messages.children('li:last-child');
 	//Heights
 	var clientHeight = messages.prop('clientHeight');
 	var scrollTop = messages.prop('scrollTop');
 	var scrollHeight = messages.prop('scrollHeight');
 	var newMessageHeight = newMessage.innerHeight();
 	var lastMessageHeight = newMessage.prev().innerHeight();

 	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight)
 	{
 		messages.scrollTop(scrollHeight);
 	}
} 



socket.on('newMessage', function(msg){
	
	var formattedTime = moment(msg.createdAt).format('h:mm a');
	var template = jQuery('#message-template').html();
	var html = Mustache.render(template, {
		from: msg.from,
		text: msg.text,
		createdAt: formattedTime
	});

	jQuery('#msg-list').append(html);
	scrollToBottom();
	// console.log('newMessage',msg);
	// var formattedTime = moment(msg.createdAt).format('h:mm a');
	// var li = jQuery('<li></li>');
	// li.text(msg.from+' '+formattedTime  + ": "+msg.text);
	// jQuery('#msg-list').append(li);
});
//+' '+formattedTime 
socket.on('newLocationMessage', function(msg){

	var template = jQuery('#location-message-template').html();

	var formattedTime = moment(msg.createdAt).format('h:mm a');
	var html = Mustache.render(template, {
		from: msg.from,
		url:msg.url,
		createdAt:msg.formattedTime
	});

	jQuery('#msg-list').append(html);
	scrollToBottom();



	// var formattedTime = moment(msg.createdAt).format('h:mm a');
	// var li  =jQuery('<li></li>');
	// var a = jQuery('<a target = "_blank">My current Location</a>');
	// li.text(msg.from+' '+formattedTime +": ");
	// a.attr('href', msg.url);
	// li.append(a);
	// jQuery('#msg-list').append(li);
});

jQuery('#message-form').on('submit', function(e){
	e.preventDefault();
	var messagebox = jQuery('[name=message]');
	socket.emit('createMessage', {
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





		