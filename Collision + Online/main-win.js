var shelljs = require('shelljs');
var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/hw4/hw4.html');
});

app.get ('/api', function (req, res) {

	//console.log ('url:' + req.url);

	var radius = req.query.radius; // ("argv");
	var rxmax = req.query.rxmax;
	var rymax = req.query.rymax;
	var rxmin = req.query.rxmin;
	var rymin = req.query.rymin;
	var cx = req.query.cx;
	var cy = req.query.cy;
	console.log(rxmax);
	console.log(rymax);
	console.log(rxmin);
	console.log(rymin);
	shelljs.exec('hw4check.exe ' + radius + ' ' + rxmax + ' ' + rymax + ' ' + rxmin + ' ' + rymin + ' ' + cx + ' ' + cy, function(status, output) {
	     //console.log('Exit status:', status);
		 // console.log('Output:', output);
          var output = {
          	status: status,
          	output: output
          };

          /*
            The response header for supporting CORS:
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type"
          */

		  res.writeHead(200, {
		  	"Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type"
		  });
	
		  res.write(JSON.stringify(output));
		  res.end();

	});
});


// or simply
// app.listen (1337); 
// will do

var server = app.listen (1337, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log ('server started on http://' + host + ':' + port);
});
