define(['pixi/pixi'], function (PIXI) {
    return {
        Quad: extend(function (quadWidth, quadHeight, color, centered) {
            PIXI.Container.call(this);

            centered = centered || false;

            var graph = new PIXI.Graphics();
            graph.beginFill(color);
            graph.drawRect(0, 0, quadWidth, quadHeight);
            graph.endFill();

            this.addChild(graph);
            if(centered) {
                this.anchor.set(0.5, 0.5);
            }
        }, PIXI.Container)
    }
});
