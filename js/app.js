// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -100;
    this.y = genY(); // 60, 140, 225
    this.move = genMove();

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

var genY = function() {
    var min = 0;
    var max = 3;
    var rand = Math.floor(Math.random() * (max - min)) + min;
    var yoptions = [60, 140, 225];
    return yoptions[rand];
};

var genMove = function() {
    var min = 0;
    var max = 3;
    var rand = Math.floor(Math.random() * (max - min)) + min;
    var moveoptions = [120, 200, 280];
    return moveoptions[rand];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var currmove = this.move * dt;
    if (this.x < 500) {
        this.x += currmove;
    } else {
        this.x = -100;
        this.y = genY();
        this.move = genMove();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Player select
// var PlayerSelect = function() {
//     var player1 = 'images/char-boy.png';
//     var player2 = 'images/char-cat-girl.png';
//     var player3 = 'images/char-horn-girl.png';
//     var player4 = 'images/char-pink-girl.png';
//     var player5 = 'images/char-princess-girl.png';

// };

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(image, name, x, y) {
    this.x = x;
    this.y = y;
    this.xmove = 100;
    this.ymove = 80;
    this.name = name;

    this.sprite = image;
};

Player.prototype.update = function(dt) {
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font="15px Courier New";
    ctx.textAlign='left';
    ctx.strokeStyle= 'black';
    ctx.strokeText(this.name, this.x + 4, this.y+46);
    ctx.fillStyle= 'white';
    ctx.fillText(this.name, this.x + 4, this.y+45);
}

Player.prototype.handleInput = function(key) {
    if (key === 'left' && (this.x - this.xmove) > -50) {
        this.x -= this.xmove;
    } else if (key === 'right' && (this.x + this.xmove) < 500) {
        this.x += this.xmove;
    } else if (key === 'up' && (this.y - this.ymove) > -50) {
        this.y -= this.ymove;
    } else if (key === 'down' && (this.y + this.ymove) < 400) {
        this.y += this.ymove;
    } else if (key === 'esc') {
        playerSelected = false;
    }
}

Player.prototype.die = function() {
    this.x = 200;
    this.y = 380;
}

var PlayerSelect = function() {
    // background
    this.background = new Background();
    // 5 players

    this.boy = new Player('images/char-boy.png', '  Charlie  ', 200 - 2*90, 230);
    this.catGirl = new Player('images/char-cat-girl.png', 'Marshmallow', 200 - 90, 230);
    this.hornGirl = new Player('images/char-horn-girl.png', '  Starcap  ', 200, 230);
    this.pinkGirl = new Player('images/char-pink-girl.png', '   Pink   ',200 + 90, 230);
    this.princess = new Player('images/char-princess-girl.png', '   Annie   ', 200 + 2*90, 230);

    // platform
    this.selector = new Selector(this.hornGirl);
    this.topLine = new GameText('Select Your Character', 120, 230+195);
    this.bottomLine = new GameText('Left/Right to Change, Enter to Choose', 40, 230+215);

};

PlayerSelect.prototype.render = function() {
    this.background.render();
    this.selector.render();
    this.boy.render();
    this.catGirl.render();
    this.hornGirl.render();
    this.pinkGirl.render();
    this.princess.render();
    this.topLine.render();
    this.bottomLine.render();
}

PlayerSelect.prototype.handleInput = function(key) {
    if (key === 'left' && this.selector.currSelect === this.princess) {
        this.selector.currSelect = this.pinkGirl;
    } else if (key === 'left' && this.selector.currSelect === this.pinkGirl) {
        this.selector.currSelect = this.hornGirl;
    } else if (key === 'left' && this.selector.currSelect === this.hornGirl) {
        this.selector.currSelect = this.catGirl;
    } else if (key === 'left' && this.selector.currSelect === this.catGirl) {
        this.selector.currSelect = this.boy;
    } else if (key === 'right' && this.selector.currSelect === this.boy) {
        this.selector.currSelect = this.catGirl;
    } else if (key === 'right' && this.selector.currSelect === this.catGirl) {
        this.selector.currSelect = this.hornGirl;
    } else if (key === 'right' && this.selector.currSelect === this.hornGirl) {
        this.selector.currSelect = this.pinkGirl;
    } else if (key === 'right' && this.selector.currSelect === this.pinkGirl) {
        this.selector.currSelect = this.princess;
    } else if (key === 'enter') {
        if (this.selector.currSelect === this.boy) {
            player = new Player('images/char-boy.png', '  Charlie  ', 200, 380);
        } else if (this.selector.currSelect === this.catGirl) {
            player = new Player('images/char-cat-girl.png', 'Marshmallow', 200, 380);
        } else if (this.selector.currSelect === this.hornGirl) {
            player = new Player('images/char-horn-girl.png', '  Starcap  ', 200, 380);
        } else if (this.selector.currSelect === this.pinkGirl) {
            player = new Player('images/char-pink-girl.png', '   Pink   ', 200, 380);
        } else if (this.selector.currSelect === this.princess) {
            player = new Player('images/char-princess-girl.png', '   Annie   ', 200, 380);
        }
        playerSelected = true;
    }
}

var GameText = function(text, x, y) {
    this.text = text;
    this.x = x;
    this.y = y;
}

GameText.prototype.render = function() {
    ctx.font="20px Courier New";
    ctx.fillStyle= 'white';
    ctx.textAlign='left';
    ctx.fillText(this.text, this.x, this.y);
}

var Background = function() {
    this.style = "rgba(0, 0, 0, 0.4)";
    this.x = 0;
    this.y = 220;
    this.width = 520;
    this.height = 250;
}

Background.prototype.render = function() {
    ctx.fillStyle = this.style;
    ctx.fillRect(this.x, this.y, this.width, this.height);
}

var Selector = function(currchar) {
    this.sprite = 'images/Selector.png';
    this.currSelect = currchar;
}

Selector.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.currSelect.x, this.currSelect.y);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var allEnemies = [enemy1, enemy2, enemy3];

var playerSelected = false;
var pSelect = new PlayerSelect();

var player;

var checkCollisions = function() {
    for (var enemy in allEnemies) {
        if (tooClose(allEnemies[enemy], player)) {
            player.die();
        }
    }
};

var tooClose = function(enemy, player) {
    return Math.abs(enemy.x - player.x) < 40 && Math.abs(enemy.y - player.y) < 10;
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter',
        27: 'esc'
    };

    if (!playerSelected) {
        pSelect.handleInput(allowedKeys[e.keyCode]);
    } else {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});