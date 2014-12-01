// this class handles all the animation
// idea: each tick along the animation, render the places on the map for the year
// and highlight the bar in the bar chart
var PlaceTraveledAnimation = function(container) {
    var placeByYear = null; 
    var worldMap = null;
    var placeCountBarchart = null; 
    var photoPopup = null;
    var idx = 0; 
    var initialized = $.Deferred();
    var ticking = null;

    function getYear(place) {
        return place.year;
    }

    function getPlaceName(place) {
        return place.name;
    }

    function tick() {
        // at each tick, 
        // 1). render the places for that year
        // 2). height the bar for the year
        worldMap.renderPoints(placeByYear[idx].places, photoPopup.show.bind(photoPopup));
        placeCountBarchart.highlight(placeByYear[idx]);
        idx += 1;
        if (idx < placeByYear.length) {
            ticking = setTimeout(tick, 1000); 
        }
    }
    
    this.showPlacesByYear = function(data) {
        // clear timeout func first
        if (ticking) {
            window.clearTimeout(ticking);
        }
       
        // highlight all the bars
        placeCountBarchart.highlightAll();

        // remove all points first before rendering the points for the current year
        worldMap.removePoints();
        worldMap.renderPoints(data.places, photoPopup.show.bind(photoPopup));
    }

    this.animate = function() {
        // animation can only be triggered when the module is fully initialized
        initialized.done(function() {
            // clear timeout func first
            if (ticking) {
                window.clearTimeout(ticking);
            }

            idx = 0;
            // first, remove all points on the map
            // gray out all the bars in the barchart
            worldMap.removePoints();
            placeCountBarchart.grayoutAll();
            
            // then start ticking
            tick();
        });
    }

    this.showAll = function() {
        //this only be triggered when the module is fully initialized
        initialized.done(function() {
            // clear timeout func first
            if (ticking) {
                window.clearTimeout(ticking);
            }

            for (var i = 0; i < placeByYear.length; i++) {
                worldMap.renderPoints(placeByYear[i].places, photoPopup.show.bind(photoPopup));
            }
            placeCountBarchart.highlightAll();
        });
    }
   
    this.init = function() {
        var html = 
            '<div class="row"><div class="col-xs-12" id="world-map"></div></div>' +
            '<div class="row" id="map-overlay">' +
            '    <div class="col-xs-4">' +
            '        <div class="bs-callout bs-callout-info">' +
            '            <h4>MY FOOTPRINTS</h4>' +
            '            <p>This visualization is built on top of d3.js. It shows my footprints over my life time.</p>' +
            '            <p>So far, i have set foot on 2 continents, 3 countries and about 70 different cities.' + 
            '                Still have a long way to go to become a real world traveller :) </p>' +
            '        </div>' + 
            '    </div>' +
            '    <div class="col-xs-8" id="place-count-barchart" style="margin-top:20px;"></div>' +
            '</div>' +
            '<div class="row" id="control-panel">' + 
            '    <div class="col-xs-12">' + 
            '        <div class="control-btns">' + 
            '            <a id="animate-btn">|animate </a> | ' +
            '            <a id="show-all-btn">|show all</a>' + 
            '        </div>' +
            '    </div>' + 
            '</div>';
        $(container).html(html);
        
        var offset = $(container).offset();
        var width = $(container).width();
        var height = width / 2;
        var extent = {
            left: offset.left, 
            right: offset.left + width, 
            top: offset.top, 
            bottom: offset.top + height
        };

        // render the map first
        worldMap = new WorldMap("#world-map", width, height);
        worldMap.render();
      
        // create a PhotoPopup Object to handle the popup window of showing the photos
        photoPopup = new PhotoPopup(extent);

        // when the data is ready, 
        // 1). set the data
        // 2). reader the bar chart
        placeCountBarchart = new BarChart("#place-count-barchart");
        LifeVizApi.getPlaceTraveledByYear(function(data) {
            placeByYear = data;
            placeCountBarchart.render(placeByYear, this.showPlacesByYear.bind(this));
            initialized.resolve("");
        }.bind(this));

        $("#animate-btn").click(this.animate.bind(this));
        $("#show-all-btn").click(this.showAll.bind(this));
    }
};

