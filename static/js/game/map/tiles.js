define(['pixi/pixi', 'core/base', 'res', 'game/anim/windgen', 'core/shapes'], function (PIXI, Base, res, WindgenAnim, Shapes) {
    /**
     * Tile
     *
     * @constructor
     */
    var Tile = extend(function () {
        Base.GameObject.call(this);

        this.buttonMode = true;
        this.interactive = true;
        this.cellX = 0;
        this.cellY = 0;
    }, Base.GameObject);

    Tile.SIZE = 30;

    Tile.prototype.put = function (cellX, cellY) {
        this.cellX = cellX;
        this.cellY = cellY;
    }

    /**
     * Grass
     *
     * @constructor
     */
    var Grass = extend(function () {
        Tile.call(this);

        var sprite = new PIXI.Sprite(res.getTexture('grass-tile'));
        this.addChild(sprite);

        this.click = function() {
            this.parent.putTile(this.cellX, this.cellY, new Windgen());
        }
    }, Tile);

    /**
     * Wire
     * @constructor
     */
    var Wire = extend(function (variant) {
        Tile.call(this);
        variant = variant || 'h';
        var sprite = new PIXI.Sprite(res.getTexture('wire-' + variant));
        this.addChild(sprite);
    }, Tile);

    /**
     * Switch
     */
    var Switch = extend(function(variant) {
        Tile.call(this);
        var sprite = new Shapes.Quad(30, 30, 0xff0000, false);
        this.addChild(sprite);
    }, Tile);

    /**
     * House
     */
    var House = extend(function() {
        Tile.call(this);
        var sprite = new Shapes.Quad(30, 30, 0xffffff, false);
        this.addChild(sprite);
    }, Tile);

    /**
     * Wind gen
     *
     * @constructor
     */
    var Windgen = extend(function () {
        Tile.call(this);

        this.addChild(new WindgenAnim());
    }, Tile);

    return {
        Tile: Tile,
        Grass: Grass,
        Windgen: Windgen,
        Wire: Wire,
        Switch: Switch,
        House: House
    }
});
