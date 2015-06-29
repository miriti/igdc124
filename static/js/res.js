define(['pixi/pixi'], function (PIXI) {
    var loader = new PIXI.loaders.Loader('/data');
    loader.add('grass-tile', 'tiles/grass.png')
        .add('wire-h', 'tiles/wire-h.png')
        .add('wire-v', 'tiles/wire-v.png')
        .add('wire-tl', 'tiles/wire-tl.png')
        .add('wire-tr', 'tiles/wire-tr.png')
        .add('wire-br', 'tiles/wire-br.png')
        .add('wire-bl', 'tiles/wire-bl.png')
        .add('wire-dist', 'tiles/wire-dist.png')
        .add('windgen-base', 'sprites/windgen-base.png')
        .add('windgen-propeller', 'sprites/windgen-propeller.png');

    return {
        loader: loader,
        r: loader.resources,
        getTexture: function (name) {
            return loader.resources[name].texture;
        }
    };
});
