define([
    'pixi/pixi',
    'core/base',
    'core/shapes',
    'core/input',
    'game/map/map',
    'game/map/town',
    'game/hud/hud',
    'game/player'
], function (PIXI, Base, shapes, Input, Map, Town, HUD, Player) {

    /**
     * Game
     *
     * @constructor
     */
    var Game = extend(function () {
        Base.GameObject.call(this);

        var map = new Map(10, 10);
        map = new Map(10, 10);
        map.scale.set(3);
        map.init(7, 15);

        map.x = -map.width / 2;
        map.y = -map.height / 2;

        var town = new Town(6);
        town.putOnMap(map, 2, 2);

        this.addChild(map);
        this.map = map;

        this.addChild(new HUD());

        Player.instance.money = 5000;

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

        Input.instance.setKeyListener(function(key) {
            if(key == Input.LEFT_ARROW) {}

            if(key == Input.RIGHT_ARROW) {}

            if(key == Input.DOWN_ARROW) {}

            if(key == Input.UP_ARROW) {}
        });

    }, Base.GameObject);

    Game.prototype.update = function(delta) {
        Player.instance.update(delta);
        Base.GameObject.prototype.update.call(this, delta);
    };

    return Game;
});
