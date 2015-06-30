define(function () {
    var Input = function () {
        this.pressedKeys = new Array(256);

        window.onkeydown = this.keydown.bind(this);
        window.onkeyup = this.keyup.bind(this);
    };

    Input.prototype = {
        keydown: function (e) {
            this.pressedKeys[e.keyCode] = this.pressedKeys[e.keyCode] || new Date().getTime();
        },
        keyup: function (e) {
            this.pressedKeys[e.keyCode] = false;
        }
    };

    return new Input();
});