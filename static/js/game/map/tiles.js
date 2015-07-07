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

    Tile.prototype.resize = null;

    Tile.prototype.put = function (cellX, cellY) {
        this.cellX = cellX;
        this.cellY = cellY;
    };

    Tile.prototype.setSelectable = function (selectable) {
        this.selectable = this.buttonMode = this.interactive = selectable;
    };

    Tile.prototype.select = function () {

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

    /**
     * Grass
     *
     * @constructor
     */
    var Grass = extend(function () {
        Tile.call(this);

        this.setSelectable(true);

        var sprite = new PIXI.Sprite(res.getTexture('grass-tile'));
        this.addChild(sprite);

        this.click = function () {
            var wires = this.parent.selectNeighbours(this.cellX, this.cellY).getTypes(Wire, Switch);

            if (wires.length == 1) {
                if (wires[0].canConnect()) {
                    var tile = new Wire();
                    this.parent.putTile(this.cellX, this.cellY, tile);
                    wires[0].connect(tile);
                }
            }
        };
    }, Tile);

    var Connectible = extend(function () {
        Tile.call(this);
        this.availableConnectionsNumber = 4;
        this.availableConnections = ['top', 'botton', 'left', 'right'];

        this.connections = {
            top: null,
            bottom: null,
            left: null,
            right: null,
            available: function () {
                for (var i in this) {
                    if (this[i] === null)
                        return true;
                }
                return false;
            }
        };
    }, Tile);

    Connectible.prototype.connect = function (connection) {
        if (this.canConnect()) {
            var conn = this.getPosition(connection);
            if (this.connections[conn] == null) {
                this.connections[conn] = connection;
                connection.connect(this);
            }
        }
    };

    Connectible.prototype.canConnect = function () {
        var connected = 0;
        for (var cn in this.connections) {
            if ((typeof this.connections[cn] !== "function") && (this.connections[cn] !== null)) {
                connected++;

                if (connected >= this.availableConnectionsNumber) {
                    return false;
                }
            }
        }

        return true;
    };

    /**
     * Wire
     * @constructor
     */
    var Wire = extend(function (variant, connected) {
        Connectible.call(this);

        this.availableConnectionsNumber = 2;

        this._sprite = null;

        this._sprites = {
            h: null,
            v: null,
            bl: null,
            tl: null,
            tr: null,
            br: null
        };

        for (var v in this._sprites) {
            this._sprites[v] = new PIXI.Sprite(res.getTexture('wire-' + v));
        }

        variant = variant || 'h';

        this.variant = variant;
        this.connected = connected || false;

    }, Connectible);

    Wire.prototype.connect = function (connection) {
        Connectible.prototype.connect.call(this, connection);
        this.variant = this.getVariant();
    };

    Wire.prototype.getVariant = function () {
        var varinat = '';

        for (var c in this.connections) {
            if ((typeof this.connections[c] !== "function") && (this.connections[c] !== null)) {
                varinat += c[0];
            }
        }

        if (varinat.length == 1) {
            switch (varinat) {
                case 'l':
                case 'r':
                    return 'h';
                case 't':
                case 'b':
                    return 'v';
            }
        }

        return varinat;
    };

    Wire.prototype.autoConnect = function () {
        var tiles = this.parent.selectNeighbours(this.cellX, this.cellY).getTypes(Wire, Switch);

        for (var i in tiles) {
            tiles[i].connect(this);
        }
    };

    Object.defineProperties(Wire.prototype, {
        variant: {
            get: function () {
                return this._variant;
            },
            set: function (variant) {
                if (this._sprites.hasOwnProperty(variant)) {
                    if (this._sprite != null) {
                        this.removeChild(this._sprite);
                    }

                    this._sprite = this._sprites[variant];
                    this.addChild(this._sprite);
                }
            }
        }
    });

    /**
     * Switch
     */
    var Switch = extend(function (variant) {
        Connectible.call(this);

        this.setSelectable(true);

        variant = variant || 'all';

        var sprite = new PIXI.Sprite(res.getTexture('switch-' + variant));
        this.addChild(sprite);
    }, Connectible);

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
