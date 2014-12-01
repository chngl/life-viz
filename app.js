var express = require('express');
var api = require('./api.js');
var app = express();

var port = process.env.PORT || 8080;

app.use("/life_viz", express.static('public'));
app.use( function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});
/*
app.all('/life_viz', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
*/
//  set the router
var router = express.Router(); 
router.get('/api/get_places_groupby_year', function(request, response) {
    api.getPlacesGroupbyYear(response);
});

router.get('/api/get_all_places', function(request, response) {
    api.getAllPlaces(response);
});

router.get('/api/get_photos_by_place/:place', function(request, response) {
    api.getPhotosByPlace(response, request.params.place);
});

router.get('/', function(request, response) {
    response.sendfile('index.html');
});

router.get('/photos/:name', function(request, response) {
    response.sendfile('./photos/' + request.params.name);
});

app.use('/life_viz', router);

app.listen(port);
console.log("server started.");
