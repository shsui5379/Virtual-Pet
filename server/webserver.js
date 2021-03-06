var http = require("http");
var fs = require("fs");
var url = require("url");
var content = require("./content");
var client = require("./clientdata");

//creating storage area
if (!fs.existsSync("./pets")) {
    fs.mkdirSync("./pets");

    for (const name in require("./constants").typeCharacteristics) {
        fs.mkdirSync("./pets/" + name);
    }
}

http.createServer(function (request, response) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    response.setHeader("Access-Control-Allow-Headers", "X-Requested-With, contenttype");
    response.setHeader("Access-Control-Allow-Credentials", true);

    var pathname = url.parse(request.url).pathname.substring(1);
    if (pathname == "") {
        pathname = "client/index.html";
    }
    var ext = pathname.substring(pathname.indexOf(".") + 1);

    if (ext == pathname) {
        response.end(client.getClientData(pathname, request));
    } else {
        var contentType = content.getFileTypeObject(ext);
        console.log("Request for " + pathname + " received.");
        fs.readFile(pathname, function (err, data) {
            if (err) {
                console.log(err);
                response.writeHead(404, { "Content-Type": contentType.type + "/" + contentType.extension });
            } else {
                response.writeHead(200, { "Content-Type": contentType.type + "/" + contentType.extension });
                if (contentType.type != "text") {
                    response.write(data, "binary");
                } else {
                    response.write(data.toString());
                }
            }
            response.end();
        })
    }
}).listen(8081);

console.log("Server running at http://127.0.0.1:8081");