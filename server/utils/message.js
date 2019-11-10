var generateMessage = (from, text)=>{
	var obj = {
		from,
		text,
		createdAt: new Date().getTime()
	}
	return obj;
};
var generateLocationMessage = function(from, lat, long){
	return {
		from,
		url:'https://google.com/maps?q='+lat+','+long
	}
}

module.exports = {
	generateMessage,
	generateLocationMessage
};