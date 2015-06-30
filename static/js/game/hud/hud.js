define(['core/base', 'game/hud/button'], function (Base, Button) {
    var HUD = extend(function () {
        Base.GameObject.call(this);
    }, Base.GameObject);

    return HUD;
});