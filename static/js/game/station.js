define(['pixi/pixi', 'core/shapes'], function (PIXI, shapes) {
    var Station = function () {
        PIXI.Container.call(this);

        this.interactive = true;
        this.buttonMode = true;
        this.addChild(new shapes.Quad(50, 50, 0xffffff));

        this.mousedown = function (e) {
            
            e.stopPropagation();
        };
    };

    return extend(Station, PIXI.Container);
});