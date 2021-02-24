var fs = require("fs");
var qs = require("querystring");
var url = require("url");
var petTools = require("./petTools");

exports.getClientData = function (pathname, request) {
    var qdata = parseQueryString(request);
    if (pathname == "create") {
        return petTools.create(qdata.name, qdata.type);
    } else if (pathname == "getPets") {
        return petTools.getPets();
    } else if (pathname == "getAvailiableTypes") {
        return petTools.getAvailiableTypes();
    } else if (pathname == "updatePet") {
        return petTools.updatePet(qdata.name, qdata.string, qdata.health, qdata.spirit, qdata.hunger, qdata.fatigue, qdata.age, qdata.lastMetabolismTime, qdata.lastPlayTime, qdata.startSleepTime, qdata.maxHealth, qdata.lifespan, qdata.appetite, qdata.energy);
    } else if (pathname == "deletePet") {
        return petTools.deletePet(qdata.name, qdata.type);
    }
    return "";
}

/**
 * Parses a request and returns its query string data as a JSON
 * @param {String} request The request made
 * @returns {JSON} An object with the query string data
 */
function parseQueryString(request) {
    let queryString = url.parse(request.url).search;
    if (queryString) {
        var qdata = queryString.substring(1);
    }
    return qs.parse(qdata);
}