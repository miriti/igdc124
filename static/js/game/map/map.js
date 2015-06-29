define(['core/base', 'game/map/tiles'], function (Base, Tiles) {
    /**
     * Map
     *
     * @param cols
     * @param rows
     * @constructor
     */
    var Map = function (cols, rows) {
        Base.GameObject.call(this);

        this.tiles = [];

        this.interactive = true;
    };

    extend(Map, Base.GameObject);

    /**
     * Initialize the map
     */
    Map.prototype.init = function (cols, rows, InitTile) {
        InitTile = InitTile || Tiles.Grass;
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                var tile = new InitTile();
                this.putTile(i, j, tile)
            }
        }
    };

    /**
     * Put a tile on the Map
     */
    Map.prototype.putTile = function (cellX, cellY, tile) {
        if (typeof this.tiles[cellX] === 'undefined') {
            this.tiles[cellX] = [];
        }

        if (typeof this.tiles[cellX][cellY] === 'undefined') {
            this.tiles[cellX][cellY] = [];
        }

        this.tiles[cellX][cellY].push(tile);

        tile.put(cellX, cellY);
        tile.x = cellX * (Tiles.Tile.SIZE);
        tile.y = cellY * (Tiles.Tile.SIZE);
        this.addChild(tile);
    };

    return Map;
});
