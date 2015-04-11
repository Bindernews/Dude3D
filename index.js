
var fs = require("fs"),
    path = require("path");

var config = require("./config");

var app, server;
function init() {
    var express = require("express");
    
    app = express();
    server = require("http").Server(app);
    
    
    app.use("/static/", express.static("static", {
        index: false
    }));
    
    // respond with the index file
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "index.html"));
    });
    
    server.listen(config.PORT);
    console.log("Server listening on *:" + config.PORT);
}

init();
