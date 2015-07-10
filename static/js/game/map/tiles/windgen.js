define([
    'res',
    'game/anim/windgen',
    'game/map/tiles/connectible'
], function (res,
             WindgenAnim,
             Connectible) {
    /**
     * Wind gen
     *
     * @constructor
     */
    var Windgen = function () {
        Connectible.call(this);

        this.buildPrice = 1000;
        this._generates = 10;

        this.availableConnections = ['bottom'];

        this.addChild(new WindgenAnim());
    };

    extend(Windgen, Connectible);

    return Windgen;
});