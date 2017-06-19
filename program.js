var moment = require('moment');
var express = require('express');
var app = express();

//document.title = "Timestamp Microservice";

app.use('/:timestamp', function(req, res){
	var param = req.params.timestamp; 
	var date = new Date(param); // construct date obj from url_path
	
	var date_obj = {unix: null, natural: null};
	
	if(date =="Invalid Date"){ // check for unix
		console.log("invalid unix");
		date =moment.unix(param)
		if(!date.isValid()){
			console.log("invalid date");
		}else{
			console.log("valid after moment.unix")
			date_obj= {
			unix: moment.unix(date).format('X'),
			natural: moment(date).format('LL')
			};
		}
	}else if(moment(date).isValid()){ // check if the date is valid
		console.log("valid");
		date_obj= {
			unix: moment.unix(param),
			natural: moment(date)
		};
	}

	res.json(date_obj);
});

app.get('/', function(req, res){
	var date_obj = {unix: null, natural: null};
	
	res.json(date_obj);
});

app.listen(3000);
