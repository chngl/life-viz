var http = require("http");
var mongojs = require("mongojs");

//var uri = "mongodb://127.0.0.1:777/life_viz";
//var db = mongojs.connect(uri, ["place_traveled"]);

var databaseUrl = "127.0.0.1:777/life_viz";
var collections = ["place_traveled"];
var db = require("mongojs").connect(databaseUrl, collections);

var server = http.createServer(requestHandler);

function requestHandler(request, response) {
    //response.writeHead(200, {"Content-Type": "text/json"});
    response.setHeader('Content-Type', 'application/json');
    db.place_traveled.find({}, {_id: 0}, function(err, places) {
        if(err) {
            console.log("There was an error executing the database query.");
            response.end();
            return;
        }
        //places.forEach(function(place) {
        //    response.json("haha");
        //})
        //response.json(places);
        response.end(JSON.stringify(places));
    });
}

server.listen(8084);

