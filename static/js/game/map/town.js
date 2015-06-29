define(['core/base', 'game/map/tiles'], function(Base, Tiles) {
    /**
     * Town
     */
    var Town = extend(function(cnt) {
        this.houseCount = cnt;
    }, Base.GameObject);

    Town.prototype.putOnMap = function(map, tileX, tileY) {
        for(var i=tileX+1; i<tileX+this.houseCount;i++) {
            map.putTile(i, tileY, new Tiles.House());
            map.putTile(i, tileY+1, new Tiles.Wire('h'));

            map.putTile(i, tileY+2, new Tiles.House());
            map.putTile(i, tileY+3, new Tiles.Wire('h'));
        }

        map.putTile(tileX, tileY+1, new Tiles.Switch());
        map.putTile(tileX, tileY+2, new Tiles.Wire('v'));
        map.putTile(tileX, tileY+3, new Tiles.Wire('bl'));
    };

    return Town;
});
