define(['pixi/pixi'], function (PIXI) {
    return {
        Quad: extend(function (quadWidth, quadHeight, color) {
            PIXI.Container.call(this);

            var graph = new PIXI.Graphics();
            graph.beginFill(color);
            graph.drawRect(-quadWidth / 2, -quadHeight / 2, quadWidth, quadHeight);
            graph.endFill();

            this.addChild(graph);
        }, PIXI.Container)
    }
});