define(['pixi/pixi', 'core/base', 'core/shapes', 'game/map/map', 'game/map/tiles'], function (PIXI, Base, shapes, Map, Tiles) {

    /**
     * Game
     *
     * @constructor
     */
    var Game = function () {
        Base.GameObject.call(this);

        this.map = new Map(10, 10);
        this.map.init(20, 20, Tiles.GrassTile);
        this.addChild(this.map);

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
