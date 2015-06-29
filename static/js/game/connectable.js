define(['pixi/pixi'], function (PIXI) {
    var Connectable = function () {
        PIXI.Container.call(this);
        
        this.connectionsCount = 1;
    };

    return extend(Connectable, PIXI.Container);
});