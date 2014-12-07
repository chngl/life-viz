var LifeVizApi = function() {
    return {
        // for now, use setTimeout for test
        getHobbyByYear: function(callback) {
            $.get("http://130.211.157.130:8080/life_viz/api/get_hobbies")
                .done(function(data) {
                    if (callback) {
                        callback(data);
                    }
                })
                .fail(function(err) {
                    console.log("error occurred getting places by year");
                });
        },

        getPlaceTraveledByYear: function(callback) {
            $.get("http://130.211.157.130:8080/life_viz/api/get_places_groupby_year")
                .done(function(data) {
                    if (callback) {
                        callback(data);
                    }
                })
                .fail(function(err) {
                    console.log("error occurred getting places by year");
                });
        },

        getPlaceDetail: function(callback) {
            $.get("http://130.211.157.130:8080/life_viz/api/get_all_places")
                .done(function(data) {
                    if (callback) {
                        callback(data);
                    }
                })
                .fail(function(err) {
                    console.log("error occurred getting place detail.");
                });
        },

        getPhotos: function(place, callback) {
            $.get("http://130.211.157.130:8080/life_viz/api/get_photos_by_place/" + place)
                .done(function(data) {
                    if (callback) {
                        callback(data);
                    }
                })
                .fail(function(err) {
                    console.log("error occurred getting photos");
                });
        }
    };
}();
/*
            setTimeout(callback([
                {   
                    "year": 2000,
                    "hobbies": [
                        {"name":"Soccer", "value": 2},
                        {"name":"Toy Car", "value": 2},
                        {"name":"Transformer", "value": 2},
                        {"name":"Yoyo", "value": 2},
                        {"name":"Video Games", "value": 2}
                    ]
                },
                {
                    "year": 2001,
                    "hobbies": [
                        {"name":"Soccer", "value": 3},
                        {"name":"Video Games", "value": 3},
                        {"name":"Yoyo", "value": 3},
                   ]
                },
                {
                    "year": 2002,
                    "hobbies": [
                        {"name":"Soccer", "value": 4},
                        {"name":"Video Games", "value": 4},
                        {"name":"Picking-up Girls", "value": 4},
                        {"name":"Pool Games", "value": 4},
                        {"name":"Basketball", "value": 4}
                   ]
                },
                {
                    "year": 2003,
                    "hobbies": [
                        {"name":"1", "value": 2},
                        {"name":"2", "value": 2},
                        {"name":"3", "value": 2},
                        {"name":"4", "value": 2},
                        {"name":"5", "value": 2},
                        {"name":"Soccer", "value": 2},
                        {"name":"Video Games", "value": 2},
                        {"name":"Picking-up Girls", "value": 2},
                        {"name":"Pool Games", "value": 2},
                        {"name":"FIFA", "value": 2},
                   ]
                }
            ]), 1000);
*/
