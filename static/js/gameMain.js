/**
 * Game Main
 *
 */
define(['core/base', 'game/game'], function (Base, Game) {
    var GameMain = function () {
        Base.GameObject.call(this);

        this.interactive = true;
    };

    return extend(GameMain, Base.GameObject, {
        startGame: function () {
            this.addChild(new Game());
        }
    });
});