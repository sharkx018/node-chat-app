var generateMessage = (from, text)=>{
	var obj = {
		from,
		text,
		createdAt: new Date().getTime()
	}
	return obj;
};

module.exports = {
	generateMessage
};