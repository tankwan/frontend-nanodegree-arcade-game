// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each Enemy instance.

    // x and y denote the coordinates which enemies start off from.
    // x is fixed, right outside the left edge of the screen
    // y has 3 random assignments, to vary the rows in which Enemies appear in.
    this.x = -100;
    this.y = this.genY(); // 60, 140, 225
    // move has 3 random assignments, to vary the speed of the Enemies' movement.
    this.move = this.genMove(); // 120, 200, 280

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// genY randomnize the lane which enemy appears on
// Reference: http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
Enemy.prototype.genY = function() {
    var min = 0;
    var max = 3;
    var rand = Math.floor(Math.random() * (max - min)) + min;
    var yoptions = [60, 140, 225];
    return yoptions[rand];
};

// randomnize the speed of enemy
// Reference: http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
Enemy.prototype.genMove = function() {
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
        // enemy restarts and left edge of screen
        // with new row and speed assignments
        this.x = -100;
        this.y = this.genY();
        this.move = this.genMove();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(image, name, x, y) {
    // x and y denote the coordinates which player starts off from.
    // x and y are fixed, at the bottom of the screen.
    this.x = x;
    this.y = y;
    this.xmove = 100;
    this.ymove = 80;
    // the name is meant for display above the player's head :)
    this.name = name;

    // The image/sprite for our player, this uses
    // a helper to easily load images
    this.sprite = image;
};

/* This function does nothing but could have been a good place to
 * handle idle movements by the player (little hops and side sways maybe?).
 */
//Player.prototype.update = function(dt) {
//};

// Draw player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.displayName();
};

// Displays name above player's head, has black text drop shadow
Player.prototype.displayName = function() {
    ctx.font='15px Courier New';
    ctx.textAlign='left';
    ctx.strokeStyle= 'black';
    ctx.strokeText(this.name, this.x + 4, this.y+46);
    ctx.fillStyle= 'white';
    ctx.fillText(this.name, this.x + 4, this.y+45);
};

Player.prototype.handleInput = function(key) {
    // Has limits to stop player from going out of screen
    if (key === 'left' && (this.x - this.xmove) > -50) {
        this.x -= this.xmove;
    } else if (key === 'right' && (this.x + this.xmove) < 500) {
        this.x += this.xmove;
    } else if (key === 'up' && (this.y - this.ymove) > -50) {
        this.y -= this.ymove;
    } else if (key === 'down' && (this.y + this.ymove) < 400) {
        this.y += this.ymove;
    } else if (key === 'esc') {
        // Toggles to character select screen.
        playerSelected = false;
    }
};

Player.prototype.die = function() {
    // If player hit by ladybug, restarts at position and loses 1 point
    this.x = 200;
    this.y = 380;
    // Score is reduced by 1
    score.number -= 1;
};

Player.prototype.win = function() {
    // If player reaches river, restarts at position and gains 1 point
    this.x = 200;
    this.y = 380;
    // Score is reduced by 1
    score.number += 1;
};

var PlayerSelect = function() {
    // Creates background pbject.
    this.background = new Background();
    // Creates 5 characters to select from.
    this.boy = new Player('images/char-boy.png', '  Charlie  ', 200 - 2*90, 230);
    this.catGirl = new Player('images/char-cat-girl.png', 'Marshmallow', 200 - 90, 230);
    this.hornGirl = new Player('images/char-horn-girl.png', '  Starcap  ', 200, 230);
    this.pinkGirl = new Player('images/char-pink-girl.png', '   Pink   ',200 + 90, 230);
    this.princess = new Player('images/char-princess-girl.png', '   Annie   ', 200 + 2*90, 230);
    // Creates selector (spotlight platform) object.
    this.selector = new Selector(this.hornGirl);
    // Creates display text in character selection screen.
    this.topLine = new GameText('Select Your Character', 120, 230+195);
    this.bottomLine = new GameText('Left/Right to Change, Enter to Choose', 40, 230+215);

};

PlayerSelect.prototype.render = function() {
    // Renders bunch of stuff to make up character selection screen.
    this.background.render();
    this.selector.render();
    this.boy.render();
    this.catGirl.render();
    this.hornGirl.render();
    this.pinkGirl.render();
    this.princess.render();
    this.topLine.render();
    this.bottomLine.render();
};

PlayerSelect.prototype.handleInput = function(key) {
    // Allows moving of platform left and right to select characters.
    if (key === 'left'){
        if (this.selector.currSelect === this.princess) {
            this.selector.currSelect = this.pinkGirl;
        } else if (this.selector.currSelect === this.pinkGirl) {
            this.selector.currSelect = this.hornGirl;
        } else if (this.selector.currSelect === this.hornGirl) {
            this.selector.currSelect = this.catGirl;
        } else if (this.selector.currSelect === this.catGirl) {
            this.selector.currSelect = this.boy;
        }
    } else if (key === 'right') {
        if (this.selector.currSelect === this.boy) {
            this.selector.currSelect = this.catGirl;
        } else if (this.selector.currSelect === this.catGirl) {
            this.selector.currSelect = this.hornGirl;
        } else if (this.selector.currSelect === this.hornGirl) {
            this.selector.currSelect = this.pinkGirl;
        } else if (this.selector.currSelect === this.pinkGirl) {
            this.selector.currSelect = this.princess;
        }
    // Selects player.
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
};

// Creates text for character select screen
var GameText = function(text, x, y) {
    this.text = text;
    this.x = x;
    this.y = y;
};

// Render function for GameText object.
GameText.prototype.render = function() {
    ctx.font='20px Courier New';
    ctx.fillStyle= 'white';
    ctx.textAlign='left';
    ctx.fillText(this.text, this.x, this.y);
};

// Creates background for character select screen.
var Background = function() {
    this.style = 'rgba(0, 0, 0, 0.4)';
    this.x = 0;
    this.y = 220;
    this.width = 520;
    this.height = 250;
};

// Render function for Background object.
Background.prototype.render = function() {
    ctx.fillStyle = this.style;
    ctx.fillRect(this.x, this.y, this.width, this.height);
};

// Creates Selector object.
var Selector = function(currchar) {
    this.sprite = 'images/Selector.png';
    this.currSelect = currchar;
};

// Render function for Selector object.
Selector.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.currSelect.x, this.currSelect.y);
};

// Create Score object.
var Score = function() {
    this.number = 0;
};

// Render function for Score object.
Score.prototype.render = function() {
    ctx.font='20px Courier New';
    ctx.textAlign='left';
    ctx.fillStyle= 'black';
    ctx.fillText('Score:' + this.number.toString(), 206, 571);
    ctx.fillStyle= 'white';
    ctx.fillText('Score:' + this.number.toString(), 205, 570);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies.
// Place the player object in a variable called player.
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var allEnemies = [enemy1, enemy2, enemy3];
var player;

// Instantiate playerSelected boolean instance.
// Instantiate characterSelect and Score objects.
var playerSelected = false;
var pSelect = new PlayerSelect();
var score = new Score();

// checkCollisions function checks if player gets hit by a ladybug.
var checkCollisions = function() {
    for (var enemy in allEnemies) {
        if (tooClose(allEnemies[enemy], player)) {
            player.die();
        }
    }
};

// tooClose function checks if player is too close for comfort to a ladybug.
var tooClose = function(enemy, player) {
    return Math.abs(enemy.x - player.x) < 40 && Math.abs(enemy.y - player.y) < 10;
};

var checkWin = function() {
    if (reachRiver(player)){
        player.win();
    }
};

var reachRiver = function(player){
    return player.y === 380 - 5 * player.ymove;
}

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

    // keys are input to pSelect or player
    // depending on whether !playerSelected is true or false.
    if (!playerSelected) {
        pSelect.handleInput(allowedKeys[e.keyCode]);
    } else {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});