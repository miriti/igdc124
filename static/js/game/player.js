define(function() {
    var Player = function() {
        this._money = 0;
        this._currentTime = 0;
    };

    Player.prototype.update = function(delta) {
        this._currentTime += delta;
        Player.notify(this, 'time');
    }

    Player._instance = null;

    Player._observers = {};

    /**
     * Subscribe
     */
    Player.subscribe = function(property, callback) {
        if(typeof property === 'string') {
            this._observers[property] = this._observers[property] || [];
            this._observers[property].push(callback);
        } else {
            for(var prop in property) {
                this.subscribe(property[prop], callback);
            }
        }
    }

    Player.unsubscribeAll = function() {
        this._observers.clear();
    }

    Player.notify = function(instance, property) {
        if(this._observers[property]){
            for(var i in this._observers[property]) {
                this._observers[property][i].call(instance, instance[property]);
            }
        }
    }

    /**
     * Define setters and getters
     */
    Object.defineProperties(Player, {
        instance: {
            get: function() {
                if(this._instance == null) {
                    this._instance = new Player();
                }
                return this._instance;
            }
        }
    });

    /**
     * Define Player's prototype setters and getters
     */
    Object.defineProperties(Player.prototype, {
        money: {
            get: function() {
                return this._money;
            },
            set: function(value) {
                this._money = value;
                Player.notify(this, 'money');
            }
        },
        time: {
            get: function() {
                return this._currentTime;
            }
        }
    });

    return Player;
});
