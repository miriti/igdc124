define(['pixi/pixi', 'core/base', 'game/player'], function (PIXI, Base, Player) {
    /**
     * Tile
     *
     * @constructor
     */
    var Tile = extend(function () {
        Base.GameObject.call(this);

        this.buildAvailable = false;

        this.cellX = 0;
        this.cellY = 0;

        this.interactive = true;
        this.buttonMode = true;

        this.mousedown = function () {
            if (Player.instance.tool) {
                Player.instance.tool.down(this);
            }
        };

        this.mouseup = function () {
            if (Player.instance.tool) {
                Player.instance.tool.up(this);
            }
        };
    }, Base.GameObject);

    Tile.SIZE = 30;

    Tile.prototype.resize = null;

    Tile.prototype.destroy = function () {
        this.map.removeTile(this);
    };

    Tile.prototype.checkBuild = function (map, cellX, cellY) {
        return true;
    };

    Tile.prototype.put = function (cellX, cellY) {
        this.cellX = cellX;
        this.cellY = cellY;
    };

    Tile.prototype.getPosition = function (tile) {
        if (this.cellX == tile.cellX) {
            if (tile.cellY - this.cellY == 1)
                return 'bottom';
            if (tile.cellY - this.cellY == -1)
                return 'top';
        }

        if (this.cellY == tile.cellY) {
            if (tile.cellX - this.cellX == 1)
                return 'right';
            if (tile.cellX - this.cellX == -1)
                return 'left';
        }

        return null;
    };

    Object.defineProperties(Tile.prototype, {
        map: {
            get: function () {
                return this.parent;
            }
        }
    });

    return Tile;
});