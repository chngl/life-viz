var lifeVizApp = (function() {
    function init() {
        var placeTraveledAnimation = new PlaceTraveledAnimation("#place-traveled-animation");
        placeTraveledAnimation.init();
        placeTraveledAnimation.animate();

        var hobbyAnimation = new HobbyAnimation("#hobby-animation");
        hobbyAnimation.init();
        hobbyAnimation.animate();

    }
    init();
}());

