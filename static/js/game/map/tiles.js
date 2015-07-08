define([
    'pixi/pixi',
    'core/base',
    'res',
    'game/anim/windgen',
    'game/map/tiles/tile',
    'game/map/tiles/connectible',
    'game/map/tiles/wire',
    'game/map/tiles/switch'
], function (PIXI,
             Base,
             res,
             WindgenAnim,
             Tile,
             Connectible,
             Wire,
             Switch) {
    /**
     * Grass
     *
     * @constructor
     */
    var Grass = extend(function () {
        Tile.call(this);

        this.buildAvailable = true;

        var sprite = new PIXI.Sprite(res.getTexture('grass-tile'));
        this.addChild(sprite);
    }, Tile);

    Grass.prototype.destroy = function () {
    };

    /**
     * House
     */
    var House = function () {
        Connectible.call(this);

        this.availableConnections = ['bottom'];

        this._offSprite = new PIXI.Sprite(res.getTexture('house-off'));
        this._onSprite = new PIXI.Sprite(res.getTexture('house-on'));

        this._current = null;
        this._light = false;

        this.light = false;

    };

    extend(House, Connectible);

    Object.defineProperties(House.prototype, {
        light: {
            get: function () {
                return this._light;
            },
            set: function (onoff) {
                if (this._current != null)
                    this.removeChild(this._current);

                this._current = onoff ? this._onSprite : this._offSprite;
                this.addChild(this._current);
            }
        }
    });

    House.prototype.consumeEnergy = function (from, amount) {
        if (amount > 0.2) {
            if (!this.light) {
                this.light = true;
            }
        } else {
            if (this.light)
                this.light = false;
        }
    };

    /**
     * Wind gen
     *
     * @constructor
     */
    var Windgen = function () {
        Connectible.call(this);

        this.availableConnections = ['bottom'];

        this.addChild(new WindgenAnim());
    };

    extend(Windgen, Connectible);

    Windgen.prototype.update = function (delta) {
        Connectible.prototype.update.call(this, delta);

        this.passEnergy(this, 1);
    };

    return {
        Tile: Tile,
        Grass: Grass,
        Windgen: Windgen,
        Wire: Wire,
        Switch: Switch,
        House: House
    }
});
