define([
    'game/map/tiles/tile'
], function (Tile) {
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

    Connectible.prototype.destroy = function () {
        for (var pos in this.connections) {
            if (this.connections[pos] !== null) {
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

    Connectible.prototype.autoConnect = function () {
        var tiles = this.map.selectNeighbours(this.cellX, this.cellY).getTypes(Connectible);

        for (var i in tiles) {
            if ((tiles[i].canConnect(tiles[i].getPosition(this)))
                &&
                (this.canConnect(this.getPosition(tiles[i])))) {
                tiles[i].connect(this);
            }
        }
    };

    /**
     * Is connection available
     *
     * @returns {boolean}
     */
    Connectible.prototype.canConnect = function (side) {
        if (side) {
            return !(this.availableConnections.indexOf(side) === -1);
        } else {
            return this.availableConnections.length > 0;
        }
    };

    Connectible.prototype.passEnergy = function (from, amount) {
        var topass = [];

        for (var side in this.connections) {
            var cn = this.connections[side];

            if ((cn !== null) && (cn !== from)) {
                topass.push(cn);
            }
        }

        if (topass.length > 0) {
            for (var i in topass) {
                topass[i].consumeEnergy(this, amount / topass.length);
            }
        }
    };

    Connectible.prototype.consumeEnergy = function (from, amount) {
        this.passEnergy(from, amount);
    };

    return Connectible;
});