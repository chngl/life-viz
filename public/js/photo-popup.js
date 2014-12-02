// This Class handles the photo-popup-div
// para: "extent" is the extent of the allowed area on screen
// is used to adjust the position of the popup when it extends 
// the area. For now: only when popup extends the right most of
// the allowed area, popup will be re-positioned.
var PhotoPopup = function(extent) {
    
    this.extent = extent;
    this.imgCount = 0;
    this.imgLoadedCount = 0;

    // place name and coordinates will be passed in
    this.show = function(place, coords) {
        // clear the previous popup
        this.close();

        var top = coords[1];
        var left = coords[0];
    
        var spinnerHtml = '<i class="fa fa-spinner fa-spin"></i>';
        d3.select("body").append("div")
            .attr("id", "spinner")
            .style({
                "position": "absolute ",
                "top": top + "px", 
                "left": left + "px", 
            })
            .html(spinnerHtml);

        // set html first
        var html = 
            '<div class="photo-pop-header">' + 
            '    <h4>' + place.name + '</h4>' + 
            '    <div class="close-sign">' + 
            '        <a id="closePopup">&#215;</a>' + 
            '    </div>' + 
            '</div>' + 
            '<ul id="imgs-ul" style="white-space:nowrap;"></ul>';
                

        // create the popup div and add the header first
        var popup = d3.select("body").append("div")
            .classed("photo-popup", true)
            .attr("id", "photo-popup-div")
            .style({
                "top": top + "px", 
                "left": left + "px", 
            })
            .html(html);

        // set the close function to the close-sign
        $("#closePopup").click(function() { 
            this.close();
        }.bind(this));

        // load photos
        // when all the photos are loaded, adjust the position and transit to display
        LifeVizApi.getPhotos(place.name, function(photos) {
            if (photos.length > 0) {
                this.imgCount = photos.length;
                this.imgLoadedCount = 0;
                for (var i = 0; i < photos.length; i++) {
                    $("#imgs-ul").append('<li><img src="' + photos[i].path + '" ></img></li>');
                }
                $('#imgs-ul img').on("load", function() {
                    this.imgLoadedCount += 1;
                    if (this.imgLoadedCount === this.imgCount) {
                        this.display();
                    }
                }.bind(this));
            }else {
                this.display();
            }

        }.bind(this));

    }
       
    // when to close, transit to transparent before remove the popup
    this.close = function() {
        d3.select("#photo-popup-div").transition()
            .duration(500)
            .style({"opacity": 0});

        $("#photo-popup-div").remove();
    }

    // when to display, adjust the position if necessary
    // then transit to show
    this.display = function() {
        
        // remove spinner first
        //$("#spinner").remove();

        // it seems css being loaded after the js codes,
        // so calling imgs[i].width may result the wrong value
        // (in my case, I want the width after comression, not the original width)
        // so remember to set the height here
        var imgs = $('#imgs-ul img').height(150); 
        if (imgs.length > 0) {
            var totalLength = 0;
            for (var i = 0; i < imgs.length; i++) {
                totalLength += imgs[i].width;
            }
            totalLength = totalLength > 800 ? 800: totalLength;
            var offset = $("#photo-popup-div").offset();
            var popupRight = offset.left + totalLength;
            
            if (popupRight > this.extent.right) {
                $("#photo-popup-div").offset({left: offset.left - (popupRight - extent.right), top: offset.top}); 
            }
        }

        d3.select("#imgs-ul").transition()
            .duration(100)
            .style({
                "opacity": 1
            });
    }
};

