var url = require('url');
var fs = require('fs');

function renderHTML(path, response){
	fs.readFile(path, null, function(error, data){ //the function is the callback,so it will be executed after the file is red
		if(error){
			response.writeHead(404);
			response.writeHead('File not found');
		} else {
			response.write(data);
		}
		response.end();
	});
}

module.exports = {
	handleRequest: function(request, response) { //we will redirect the html files
		response.writeHead(200, {'Content-Type': 'text/html'});
		//check what url user entered

		var path = url.parse(request.url).pathname; //this variable will be the url that the user typed
		switch (path) {
			case '/':
				renderHTML('./index.html', response);
				break;
			case '/login':
				renderHTML('./login.html', response);
				break;
			default:
				response.writeHead(404);  //if the url typed doesn't exist
				response.write('Route not defined');
				response.end();
		}
	}
};