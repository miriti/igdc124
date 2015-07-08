define(['pixi/pixi', 'core/base', 'res', 'game/anim/windgen', 'game/map/tiles/tile', 'game/player'], function (PIXI, Base, res, WindgenAnim, Tile, Player) {
    /**
     * Grass
     *
     * @constructor
     */
    var Grass = extend(function () {
        Tile.call(this);

        this.buildAvailable = true;

        var sprite = new PIXI.Sprite(res.getTexture('grass-tile'));
        this.addChild(sprite);
    }, Tile);

    Grass.prototype.destroy = function () {
    };

    var Connectible = extend(function () {
        Tile.call(this);
        this.availableConnections = ['top', 'bottom', 'left', 'right'];

        this.connections = {
            top: null,
            bottom: null,
            left: null,
            right: null
        };
    }, Tile);

    Connectible.prototype.removeConnection = function (conn) {
        var index = this.availableConnections.indexOf(conn);
        if (index !== -1) {
            this.availableConnections.splice(index, 1);
        }
    };

    Connectible.prototype.destroy = function() {
        for(var pos in this.connections) {
            if(this.connections[pos] !== null) {
                this.connections[pos].disconnect(this);
            }
        }
        Tile.prototype.destroy.call(this);
    };

    /**
     * Connect connections
     *
     * @param connection
     */
    Connectible.prototype.connect = function (connection) {
        var pos = this.getPosition(connection);
        if (this.canConnect(pos)) {
            if (this.connections[pos] == null) {
                this.connections[pos] = connection;
                connection.connect(this);
                this.removeConnection(pos);
            }
        }
    };

    Connectible.prototype.disconnect = function (connection) {
        var pos = this.getPosition(connection);
        this.connections[pos] = null;
        this.availableConnections.push(pos);
    };

    /**
     * Is connection available
     *
     * @returns {boolean}
     */
    Connectible.prototype.canConnect = function (side) {
        if (side) {
            return this.availableConnections.length > 0;
        } else {
            return !(this.availableConnections.indexOf(side) === -1);
        }
    };

    /**
     * Wire
     *
     * @constructor
     */
    var Wire = extend(function (variant, connected) {
        Connectible.call(this);

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

    Wire.prototype.put = function (cellX, cellY) {
        Connectible.prototype.put.call(this, cellX, cellY);
        this.autoConnect();
    };

    Wire.prototype.checkBuild = function (map, cellX, cellY) {
        var wires = map.selectNeighbours(cellX, cellY).getTypes(Wire, Switch);

        if (wires.length > 0) {
            for (var i in wires) {
                var pos = wires[i].getPosition(this);

                if (wires[i].canConnect(pos))
                    return true;
            }
        }
        return false;
    };

    Wire.prototype.connect = function (connection) {
        Connectible.prototype.connect.call(this, connection);
        if (this.availableConnections.length == 2) {
            this.availableConnections = [];
        }
        this.variant = this.getVariant();
    };

    Wire.prototype.disconnect = function (connection) {
        Connectible.prototype.disconnect.call(this, connection);
        this.variant = this.getVariant();
    };

    Wire.prototype.getVariant = function () {
        var varinat = '';

        for (var c in this.connections) {
            if (this.connections[c] !== null) {
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
        var tiles = this.map.selectNeighbours(this.cellX, this.cellY).getTypes(Wire, Switch);

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

        variant = variant || 'all';

        var sprite = new PIXI.Sprite(res.getTexture('switch-' + variant));
        this.addChild(sprite);
    }, Connectible);

    /**
     * House
     */
    var House = extend(function () {
        Connectible.call(this);

        this.availableConnections = ['bottom'];

        var sprite = new PIXI.Sprite(res.getTexture('house-off'));
        this.addChild(sprite);
    }, Connectible);

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
