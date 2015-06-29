define(['core/base', 'game/map/tiles'], function (Base, tiles) {
    /**
     * Map
     *
     * @param cols
     * @param rows
     * @constructor
     */
    var Map = function (cols, rows) {
        Base.GameObject.call(this);

        this.interactive = true;


        this.scale.set(2);
    };

    extend(Map, Base.GameObject);

    Map.prototype.init = function (cols, rows, InitTile) {
        this.tiles = [];

        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                var tile = new InitTile();
                this.putTile(i, j, tile)
            }
        }
    };

    Map.prototype.putTile = function (cellX, cellY, tile) {
        if (typeof this.tiles[cellX] === 'undefined') {
            this.tiles[cellX] = [];
        }

        if (typeof this.tiles[cellX][cellY] === 'undefined') {
            this.tiles[cellX][cellY] = [];
        }

        this.tiles[cellX][cellY].push(tile);

        tile.put(cellX, cellY);
        tile.x = cellX * (tiles.Tile.SIZE);
        tile.y = cellY * (tiles.Tile.SIZE);
        this.addChild(tile);
    };

    return Map;
});