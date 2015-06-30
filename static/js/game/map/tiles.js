define(['pixi/pixi', 'core/base', 'res', 'game/anim/windgen', 'core/shapes'], function (PIXI, Base, res, WindgenAnim, Shapes) {
    /**
     * Tile
     *
     * @constructor
     */
    var Tile = extend(function () {
        Base.GameObject.call(this);
        this.selectable = false;
        
        this.cellX = 0;
        this.cellY = 0;
        
        var selectFilters = [new PIXI.filters.BloomFilter()];

        this.mousedown = function (e) {
            if (this.selectable) {
                this.select();
                e.stopPropagation();
            }
        };

        this.mouseover = function () {
            if (this.selectable) {
                this.filters = selectFilters;
            }
        };

        this.mouseout = function () {
            if (this.selectable) {
                this.filters = null;
            }
        }
    }, Base.GameObject);

    Tile.SIZE = 30;

    Tile.prototype.put = function (cellX, cellY) {
        this.cellX = cellX;
        this.cellY = cellY;
    };
    
    Tile.prototype.setSelectable = function(selectable) {
        this.selectable = this.buttonMode = this.interactive = selectable;
    };

    Tile.prototype.select = function () {

    };

    /**
     * Grass
     *
     * @constructor
     */
    var Grass = extend(function () {
        Tile.call(this);

        var sprite = new PIXI.Sprite(res.getTexture('grass-tile'));
        this.addChild(sprite);

        this.click = function () {
            //this.parent.putTile(this.cellX, this.cellY, new Windgen());
        };
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
    var Switch = extend(function (variant) {
        Tile.call(this);
        
        this.setSelectable(true);

        variant = variant || 'all';

        var sprite = new PIXI.Sprite(res.getTexture('switch-' + variant));
        this.addChild(sprite);
    }, Tile);

    /**
     * House
     */
    var House = extend(function () {
        Tile.call(this);
        
        this.setSelectable(true);
        
        var sprite = new PIXI.Sprite(res.getTexture('house-off'));
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
