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

