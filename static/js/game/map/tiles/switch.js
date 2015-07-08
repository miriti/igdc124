define([
    'res',
    'game/map/tiles/connectible'
], function (res, Connectible) {
    /**
     * Switch
     */
    var Switch = function (variant) {
        Connectible.call(this);

        variant = variant || 'all';

        switch (variant) {
            case 'h-top':
                this.availableConnections = ['left', 'top', 'right'];
                break;
            case 'h-bottom':
                this.availableConnections = ['left', 'bottom', 'right'];
                break;
        }

        var sprite = new PIXI.Sprite(res.getTexture('switch-' + variant));
        this.addChild(sprite);
    };

    extend(Switch, Connectible);

    return Switch;
});