define(['pixi/pixi', 'core/base', 'core/shapes', 'game/map/map', 'game/map/town'], function (PIXI, Base, shapes, Map, Town) {

    /**
     * Game
     *
     * @constructor
     */
    var Game = function () {
        Base.GameObject.call(this);

        var map = new Map(10, 10);
        map = new Map(10, 10);
        map.scale.set(2);
        map.init(20, 20);

        var town = new Town(4);
        town.putOnMap(map, 2, 2);

        this.addChild(map);
        this.map = map;

        this.interactive = true;
        this.drag = null;

        this.mousedown = function (e) {
            this.drag = {
                mouse: e.data.global.clone()
            };
        };

        this.mouseup = function () {
            this.drag = null;
        };

        this.mousemove = function (e) {
            if (this.drag !== null) {
                this.map.x += (e.data.global.x - this.drag.mouse.x);
                this.map.y += (e.data.global.y - this.drag.mouse.y);
                this.drag.mouse = e.data.global.clone();
            }
        };
    };

    return extend(Game, Base.GameObject);
});
