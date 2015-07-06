define(['core/base', 'game/map/tiles'], function (Base, Tiles) {
    /**
     * Town
     */
    var Town = extend(function (cnt) {
        this.houseCount = cnt;
    }, Base.GameObject);

    Town.prototype.putOnMap = function (map, tileX, tileY) {
        var addedWires = [];

        for (var i = tileX + 1; i <= tileX + this.houseCount; i++) {
            map.putTile(i, tileY, new Tiles.House());
            map.putTile(i, tileY + 1, new Tiles.Switch('h-top'));

            map.putTile(i, tileY + 2, new Tiles.House());
            map.putTile(i, tileY + 3, new Tiles.Switch('h-top'));
        }

        map.putTile(tileX, tileY + 1, new Tiles.Switch('all'));
        addedWires.push(map.putTile(tileX, tileY + 2, new Tiles.Wire()));
        addedWires.push(map.putTile(tileX, tileY + 3, new Tiles.Wire()));


        addedWires.push(map.putTile(tileX + this.houseCount + 1, tileY + 1, new Tiles.Wire()));
        addedWires.push(map.putTile(tileX + this.houseCount + 1, tileY + 2, new Tiles.Wire()));
        addedWires.push(map.putTile(tileX + this.houseCount + 1, tileY + 3, new Tiles.Wire()));
        
        for(var i in addedWires) {
            addedWires[i].autoConnect();
        }
    };

    return Town;
});
