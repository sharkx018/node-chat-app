var moment = require('moment');
var generateMessage = (from, text)=>{
	var obj = {
		from,
		text,
		createdAt: moment().valueOf()
	}
	return obj;
};
var generateLocationMessage = function(from, lat, long){
	return {
		from,
		url:'https://google.com/maps?q='+lat+','+long,
		createdAt: moment().valueOf()
	}
}

module.exports = {
	generateMessage,
	generateLocationMessage
};