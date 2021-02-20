var fs = require("fs");
var qs = require("querystring");
var url = require("url");

exports.getClientData = function (pathname, request) {
    var qdata = parseQueryString(request);
    if (pathname == "create") {
        if (fs.existsSync("pets/" + qdata.type + "/" + qdata.name + ".json")) {
            return "false";
        } else {
            return "true";
        }
    }
    return "";
}

function parseQueryString(request) {
    var qdata = url.parse(request.url).search.substring(1);
    return qs.parse(qdata);
}