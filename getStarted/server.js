var http = require('http');
var fs = require('fs'); //read file

function onRequest(request, response){
	response.writeHead(200, {'Content-Type': 'text/html'});
	fs.readFile('./index.html', null, function(error, data){ //the function is the callback,so it will be executed after the file is red
		if(error){
			response.writeHead(404);
			response.writeHead('File not found');
		} else {
			response.write(data);
		}
		response.end();
	});
}

http.createServer(onRequest).listen(8000);
