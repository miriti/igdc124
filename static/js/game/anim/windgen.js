define(['pixi/pixi', 'core/base', 'res'], function (PIXI, Base, res) {
    var WindgenAnim = function () {
        Base.GameObject.call(this);

        var base = new PIXI.Sprite(res.getTexture('windgen-base'));
        base.y = -30;
        this.addChild(base);

        this.propeller = new PIXI.Sprite(res.getTexture('windgen-propeller'));
        this.propeller.pivot.set(20, 30);
        this.propeller.x = 15;
        this.propeller.y = -30;
        this.addChild(this.propeller);
    };

    return extend(WindgenAnim, Base.GameObject, {
        update: function (delta) {
            Base.GameObject.prototype.update.call(this, delta);
            this.propeller.rotation += (Math.PI) * delta;
        }
    });
});