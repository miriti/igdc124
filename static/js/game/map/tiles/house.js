define([
    'res',
    'game/map/tiles/connectible'
], function (res,
             Connectible) {
    /**
     * House
     */
    var House = function () {
        Connectible.call(this);

        this.availableConnections = ['bottom'];

        this._offSprite = new PIXI.Sprite(res.getTexture('house-off'));
        this._onSprite = new PIXI.Sprite(res.getTexture('house-on'));

        this._current = null;
        this._light = true;

        this.light = false;
    };

    extend(House, Connectible);

    House.prototype.update = function (delta) {
        Connectible.prototype.update.call(this, delta);
        this.light = this.consume() >= 20;
    };

    Object.defineProperties(House.prototype, {
        light: {
            get: function () {
                return this._light;
            },
            set: function (onoff) {
                if (onoff != this._light) {
                    if (this._current != null)
                        this.removeChild(this._current);

                    this._current = onoff ? this._onSprite : this._offSprite;
                    this.addChild(this._current);
                    this._light = onoff;
                }
            }
        }
    });

    return House;
});