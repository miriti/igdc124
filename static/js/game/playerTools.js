define(['core/input'], function (Input) {
    var Tool = function () {

    };

    Tool.prototype = {
        name: '',
        choosen: function () {
        },
        dropped: function () {
        },
        down: function (tile) {
        },
        up: function (tile) {
        },
        move: function (map) {
        }
    };

    /**
     * Move tool
     *
     * @constructor
     */
    var Move = extend(function () {
        Tool.call(this);

        this.name = 'move';
        this.drag = null;
    }, Tool);

    Move.prototype.down = function (tile) {
        this.drag = {
            mouse: {
                x: Input.instance.Mouse.x,
                y: Input.instance.Mouse.y
            }
        };
    };

    Move.prototype.up = function (tile) {
        this.drag = null;
    };

    Move.prototype.move = function (map) {
        if (this.drag !== null) {
            map.x += (Input.instance.Mouse.x - this.drag.mouse.x);
            map.y += (Input.instance.Mouse.y - this.drag.mouse.y);
            this.drag.mouse = {
                x: Input.instance.Mouse.x,
                y: Input.instance.Mouse.y
            }
        }
    };

    var Build = extend(function () {
        Tool.call(this);
        this.Tile = null;
        this.name = 'build';
    }, Tool);

    Build.prototype.choosen = function () {
        this.Tile = null;
    };

    Build.prototype.down = function (tile) {
        if ((tile.buildAvailable) && (this.Tile !== null)) {
            var newTile = new this.Tile();
            newTile.cellX = tile.cellX;
            newTile.cellY = tile.cellY;

            if (newTile.checkBuild(tile.map, tile.cellX, tile.cellY)) {
                tile.map.putTile(tile.cellX, tile.cellY, newTile);
            } else {
                console.log('cant build there');
            }
        }
    };

    Build.prototype.setTile = function (TileType) {
        this.Tile = TileType;
    };

    /**
     * Demolition
     */
    var Demolition = extend(function () {
        Tool.call(this);
        this.name = 'demolition';
    }, Tool);

    Demolition.prototype.down = function (tile) {
        tile.destroy();
    };

    return {
        Demolition: new Demolition(),
        Build: new Build(),
        Move: new Move()
    }
});