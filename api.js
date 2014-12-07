var mongojs = require("mongojs");

var databaseUrl = "127.0.0.1:27017/life_viz";
var collections = ["place_traveled", "photos", "hobby"];
var db = require("mongojs").connect(databaseUrl, collections);

function getHobbies(response) {
    db.hobby.find({}, {_id: 0}, function(err, hobbies) {
        if(err) {
            console.log("There was an error getting all the places.");
            response.end();
            return;
        }
        response.json(hobbies);
    }).sort({"year": 1});
}

function getPlacesGroupbyYear(response) {
    db.place_traveled.group({
        key: {year: 1},
        initial: { places: [], count: 0 },
        reduce: function(curr, result) { 
            result.count += 1; 
            result.places.push({
                "name": curr.name, 
                "lng": curr.lng, 
                "lat": curr.lat, 
                "year": curr.year
            });
        }
    }, function(err, placeByYear) {
        if(err) {
            console.log("There was an error getting the place goupby year.");
            response.end();
            return;
        }
        response.json(placeByYear);
    });
}

function getAllPlaces(response) {
    //response.setHeader('Content-Type', 'application/json');
    db.place_traveled.find({}, {_id: 0}, function(err, places) {
        if(err) {
            console.log("There was an error getting all the places.");
            response.end();
            return;
        }
        response.json(places);
    });
}

function getPhotosByPlace(response, place) {
    db.photos.find({name: place}, {_id: 0}, function(err, photos) {
        if(err) {
            console.log("There was an error getting the photos by place.");
            response.end();
            return;
        }
        response.json(photos);
    });
}

exports.getPlacesGroupbyYear = getPlacesGroupbyYear;
exports.getAllPlaces = getAllPlaces;
exports.getPhotosByPlace = getPhotosByPlace;
exports.getHobbies = getHobbies;
