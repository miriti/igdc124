define(['pixi/pixi', 'core/base', 'res', 'game/anim/windgen'], function (PIXI, Base, res, WindgenAnim) {
    /**
     * Tile
     *
     * @constructor
     */
    var Tile = function () {
        Base.GameObject.call(this);

        this.buttonMode = true;
        this.interactive = true;
        this.cellX = 0;
        this.cellY = 0;
    };

    Tile.SIZE = 30;

    extend(Tile, Base.GameObject, {
        put: function (cellX, cellY) {
            this.cellX = cellX;
            this.cellY = cellY;
        }
    });

    /**
     * Grass
     *
     * @constructor
     */
    var GrassTile = function () {
        Tile.call(this);

        var sprite = new PIXI.Sprite(res.getTexture('grass-tile'));
        this.addChild(sprite);

        this.click = function() {
            this.parent.putTile(this.cellX, this.cellY, new WindGenTile());
        }
    };

    extend(GrassTile, Tile);

    /**
     * Wire
     * @constructor
     */
    var WireTile = function () {
        Tile.call(this);
    };

    extend(WireTile, Tile);

    /**
     * Wind gen
     *
     * @constructor
     */
    var WindGenTile = function () {
        Tile.call(this);

        this.addChild(new WindgenAnim());
    };

    extend(WindGenTile, Tile);

    return {
        Tile: Tile,
        GrassTile: GrassTile,
        WindGenTile: WindGenTile
    }
});
