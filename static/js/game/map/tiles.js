define([
    'game/map/tiles/tile',
    'game/map/tiles/grass',
    'game/map/tiles/connectible',
    'game/map/tiles/wire',
    'game/map/tiles/switch',
    'game/map/tiles/windgen',
    'game/map/tiles/house'
], function (Tile,
             Grass,
             Connectible,
             Wire,
             Switch,
             Windgen,
             House) {
    return {
        Tile: Tile,
        Grass: Grass,
        Windgen: Windgen,
        Wire: Wire,
        Switch: Switch,
        House: House
    }
});
