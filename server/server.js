const path = require('path');
const express = require('express');
var app = express();

var loc = path.join(__dirname,'/../public');
app.use( express.static(loc));

//console.log(path.join(__dirname,'/../public'));

app.listen(3000, ()=>{
	console.log('Server is running on port: 3000');
});
