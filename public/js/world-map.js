var WorldMap = function(container, containerWidth, containerHeight) {
    var zoom = d3.behavior.zoom()
        .scaleExtent([1, 6])
        .on("zoom", move);

    var t = [0, 0];
    var s = 1;

    var width = containerWidth;
    var height = containerHeight;

    var topo = null;
    var projection = null;
    var path = null;
    var svg = null;
    var mapGroup = null;
    var pointGroup = null;

    var graticule = d3.geo.graticule();
    var tooltip = d3.select(container).append("div").attr("class", "tooltip hidden");
   
    var pointInitColor = "#fce337";
    var pointInitOpacity = 0.6;
    var pointInitRadius = 7;

    var pointClickedColor = "orange";
    var pointClickedOpacity = 1;
    var pointClickedRadius = 15;
    var points = [];

    this.render = function() {
        setup(width, height);
        d3.json("data/world-topo-small.json", function(error, world) {
            var countries = topojson.feature(world, world.objects.countries).features;
            topo = countries;
            draw(topo);
        });
    }

    // when rendering the points, attach a transition to transit the 
    // points from 0 radius to a value to have a visual effect
    this.renderPoints = function(pnts, pointClicked) {
        points.push.apply(points, pnts);
        pointGroup.selectAll("circle").data(points)
            .enter()
            .append("circle")
            .attr("cx", function(d) { return projection([d.lng, d.lat])[0]; })
            .attr("cy", function(d) { return projection([d.lng, d.lat])[1]; })
            .attr("class","point")
            .attr("r", 0)
            .attr("fill", pointInitColor)
            .attr("opacity", pointInitOpacity)
            .on("click", function(d) {
                pointGroup.selectAll("circle")
                    .attr("fill", pointInitColor)
                    .attr("r", pointInitRadius / s);
                d3.select(this).transition()
                    .duration(500)
                    .attr("fill", pointClickedColor)
                    .attr("r", pointClickedRadius / s)
                    .transition()
                    .duration(1000)
                    .attr("fill", pointInitColor)
                    .attr("r", pointInitRadius / s);

                // use pageX and pageY to get the abolute positon of the mouse
                var coordinates = [d3.event.pageX, d3.event.pageY];
                pointClicked(d, coordinates);
            })
            .transition()
            .duration(1000)
            .attr("r", function(d) { return pointClickedRadius / s; })
            .attr("opacity", function(d) { return pointInitOpacity; })
           .transition()
           .duration(1000)
           .attr("r", pointInitRadius / s);

    }
    
    this.removePoints = function() {
        // be sure to empty points, otherwise some funky thing's gonna happen
        points = [];
        pointGroup.selectAll("circle").data([]).exit().remove();
    }

    function setup(width, height){
        projection = d3.geo.equirectangular()
            .translate([(width / 2), (height / 2)])
            .scale( width / 2 / Math.PI);

        path = d3.geo.path().projection(projection);

        svg = d3.select(container).append("svg")
            .attr("width", width)
            .attr("height", height)
            .call(zoom);
        mapGroup = svg.append("g");
        pointGroup = svg.append("g");
    }

    function draw(topo) {
        mapGroup.append("path")
            .datum(graticule.outline)
            .attr("class", "background")
            .attr("d", path);

        var country = mapGroup.selectAll(".country").data(topo);
        country.enter().insert("path")
            .attr("class", "country")
            .attr("d", path)
            .attr("id", function(d,i) { return d.id; })
            .attr("title", function(d,i) { return d.properties.name; });

        mapGroup.append("g")
            .attr("class", "graticule")
          .selectAll("path")
            .data(graticule.lines)
          .enter().append("path")
            .attr("d", path);

        mapGroup.append("path")
            .datum({type: "LineString", coordinates: [[-180, 0], [-90, 0], [0, 0], [90, 0], [180, 0]]})
            .attr("class", "equator")
            .attr("d", path);
    }

    function move() {
        t = d3.event.translate;
        s = d3.event.scale; 
        zscale = s;
        var h = height / 4;
        t[0] = Math.min(
            (width/height)  * (s - 1), 
            Math.max( width * (1 - s), t[0] )
        );

        t[1] = Math.min(
            h * (s - 1) + h * s, 
            Math.max(height  * (1 - s) - h * s, t[1])
        );

        zoom.translate(t);
        mapGroup.attr("transform", "translate(" + t + ")scale(" + s + ")");
        pointGroup.attr("transform", "translate(" + t + ")scale(" + s + ")");
        
        //adjust some attributes accordingly
        d3.selectAll(".country").style("stroke-width", 1.5 / s);
        d3.selectAll(".point").attr("r", pointInitRadius / s);
    }
};

