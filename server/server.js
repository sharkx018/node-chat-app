const path = require('path');
const express = require('express');


var loc = path.join(__dirname,'/../public');
const port = process.env.PORT || 3001;
var app = express();


app.use( express.static(loc));

//console.log(path.join(__dirname,'/../public'));

app.listen(port, ()=>{
	console.log('Server is running on port: '+port);
});
