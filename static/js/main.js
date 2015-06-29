window.extend = function (a, b, params) {
    a.prototype = Object.create(b.prototype);
    a.prototype.constructor = a;

    if (typeof params !== 'undefined') {
        for (var k in params) {
            a.prototype[k] = params[k];
        }
    }

    return a;
};

require.config({
    basePath: "/js",
    paths: {
        'pixi': '/lib/pixi.js/bin'
    }
});

require(['pixi/pixi', 'gameMain', 'res'], function (PIXI, GameMain, res) {
    PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

    var renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.view);

    var gameMain = new GameMain();
    gameMain.loading();

    function animate() {
        gameMain.update(1000 / 60); // TODO: Real delta time
        renderer.render(gameMain);
        requestAnimationFrame(animate);
    }

    window.onresize = function () {
        renderer.resize(window.innerWidth, window.innerHeight);
        gameMain.x = window.innerWidth / 2;
        gameMain.y = window.innerHeight / 2;
    };

    window.onresize();

    animate();

    var loader = res.loader;

    loader.once('complete', function () {
        gameMain.startGame();
    });
    loader.load();
});
