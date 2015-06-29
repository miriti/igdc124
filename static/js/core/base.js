define(['pixi/pixi'], function (PIXI) {
    var GameObject = function () {
        PIXI.Container.call(this);
    };

    extend(GameObject, PIXI.Container);

    GameObject.prototype.update = function (delta) {
        for (var i in this.children) {
            if (typeof this.children[i]['update'] === 'function') {
                this.children[i].update(delta);
            }
        }
    };

    return {
        GameObject: GameObject
    }
});