var lifeVizApp = (function() {
    function init() {
        var placeTraveledAnimation = new PlaceTraveledAnimation("#main");
        placeTraveledAnimation.init();
        placeTraveledAnimation.animate();
    }
    init();
}());

