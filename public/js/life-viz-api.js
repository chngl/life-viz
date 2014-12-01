var LifeVizApi = function() {
    return {
        getPlaceTraveledByYear: function(callback) {
            $.get("http://127.0.0.1:8080/life_viz/api/get_places_groupby_year")
                .done(function(data) {
                    if (callback) {
                        callback(data);
                    }
                })
                .fail(function(err) {
                    alert(err);
                });
        },

        getPlaceDetail: function(callback) {
            $.get("http://127.0.0.1:8080/life_viz/api/get_all_places")
                .done(function(data) {
                    if (callback) {
                        callback(data);
                    }
                })
                .fail(function(err) {
                    alert(err);
                });
        },

        getPhotos: function(place, callback) {
            $.get("http://127.0.0.1:8080/life_viz/api/get_photos_by_place/" + place)
                .done(function(data) {
                    if (callback) {
                        callback(data);
                    }
                })
                .fail(function(err) {
                    alert(err);
                });
        }
    };
}();
