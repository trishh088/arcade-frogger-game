var selectedChar; //Used as pointer for the selected sprite URL in array
var chars = [ //Array of URLs for player and NPC sprites
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
];
var play = false; //Whether the game has begun; used to trigger character selector screen
var Selector = function() {
  // this = this;
    this.col = 0;
    this.x = this.col * 111 + 200;
    this.y = 330;
    this.sprite = 'images/Selectorcrop.png';
    this.alpha = 1;
    this.throbdir = 'transparent';
};

// Receives input from user to move selector
Selector.prototype.handleInput = function(key) {
    if (key == 'left') {
        this.col > 0 ? (this.col--, this.x = this.col * 101 + 202) : this.col;
    }
    if (key == 'right') {
      this.col < 4 ? (this.col++, this.x = this.col * 101 + 202) : this.col;
    }
    if (key == 'enter') {
      selectedChar = this.col;
      console.log(selectedChar);
       player.sprite = chars[selectedChar] ;

      play = true;

    }
};
console.log(chars[selectedChar]);
// Selector render function
Selector.prototype.render = function() {
    ctx.save();
    this.throb();
    ctx.globalAlpha = this.alpha;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.restore();
};

// Helper for Selector.render that uses alpha transparency to "throb" the selector
Selector.prototype.throb = function() {
    if (this.alpha > 0.5 && this.throbdir === 'transparent') {//'down') {
        this.alpha -= 0.0075;
    }
    else {
        this.throbdir = 'transparent';//'up';
        this.alpha += 0.0075;
        if (this.alpha > 1 && this.throbdir === 'opaque') { //'up') {
            this.throbdir = 'transparent';//'down';
        }
    }
};


// Instantiates our selector; called in Engine.js before init()
 function initLoad() {
     selector = new Selector();
 }


var Game = function() {
  //Preload audio sample(s)
  this.getGemEfx = new Audio('audio/getGem.wav');
  this.loseLifeEfx = new Audio('audio/loseLife.wav');
  this.winGameEfx = new Audio('audio/wingame.wav');
};
document.getElementById('mute').addEventListener('click', function (icon) {
  if ( game.getGemEfx.muted && game.loseLifeEfx && game.winGameEfx ) {
    game.getGemEfx.muted = false
    game.loseLifeEfx.muted = false
    game.winGameEfx.muted = false
    icon.target.innerHTML = '🔊'
  }
  else {
    game.getGemEfx.muted = true
    game.loseLifeEfx.muted = true
    game.winGameEfx.muted = true
    icon.target.innerHTML = '🔇'
  }
})

var game = new Game();

// Enemies our player must avoid
var Enemy = function(a, b, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = a;
    this.y = b;
    this.speed = Math.random() * (250 - 10) + 10;
    this.width = 75;
    this.height = 50;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.score = 0;
    this.lives = 3;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < ctx.canvas.width) {
        this.x += (this.speed * dt);
    } else
        this.x = 0;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(play) {
    this.x = 401;
    this.y = 435;
    this.width = 50;
    this.height = 70;
    //initial score of the player
    this.score = 0;
    //initial number of the player
    this.lives = 3;

    // document.getElementById('score').innerHTML = this.score + this.newScore; //to link the updated score to html file
     document.getElementById('lives').innerHTML = this.lives;
    // this.sprite = 'images/char-boy.png';
    //  this.sprite = chars[selectedChar];

};


// reset player position
Player.prototype.reset = function() {
    this.x = 401;
    this.y = 435;
    // this.sprite = chars[selectedChar];

};

//Player water position
// Player.prototype.water = function (x,y) {
//   this.x = 30;
//   this.y = 0;
// };


// Player.prototype.drawText = function() {
//   ctx.font = "20px Verdana";
//   ctx.fillStyle = "black";
//   ctx.fillText("Score: " + this.score, 200, 950);
//
// };


//player score updates



Player.prototype.update = function() {
    //collision detection
    //this is player
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + allEnemies[i].width &&
            this.x + this.width > allEnemies[i].x &&
            this.y < allEnemies[i].y + allEnemies[i].height &&
            this.height + this.y > allEnemies[i].y) {
            // collision detected!
            // this.x = 201;
            // this.y = 401;
game.loseLifeEfx.play();
            this.reset();
            this.score -= 2;
            document.getElementById("score").innerHTML =  this.score;  // update score
            this.lives -= 1;
            document.getElementById("lives").innerHTML =  this.lives;  // update score
            if(this.lives === 0){
              alert("Game Over");
              this.score = 0;
              document.getElementById("score").innerHTML =  this.score;  // update score
              this.lives = 3;
              document.getElementById("lives").innerHTML =  this.lives;  // update score


            }

            }
            else if(this.x === 30 || this.y === 0){ //checks wether the player has reachers the water
              this.score += 2;  //increments the score
              document.getElementById("score").innerHTML =  this.score;  // updates the score
              this.reset();
        }
// else if(this.score === 4){
//         //  this.reset;
//         //  document.getElementById("won").innerHTML =  "WON";  // updates the score
//
// }




    }


};




Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (key === 'left' && this.x >= 100) {
                this.x -= 100; // how much area of the canvas the player moves
            } else {
                this.x = 0; //so that the player doesnt go off canvas
            }
            break;
        case 'up':
            if (key === 'up' && this.y >= 30) {
                this.y -= 82.5;
                // hasReachedWater = true;
            } else {
                this.y = 0;
            }
            break;

        case 'right':
            if (key === 'right' && this.x <= 707) {
                this.x += 100;
            } else {
                this.x = 808;
            }
            break;

        case 'down':
            if (key === 'down' && this.y <= 400) {
                this.y += 82.5;
            } else {
                this.y = 420;
            }
            break;

    }
    // go = !go;

//for the star object so that it runs every time the player moves

    if(this.x < star.x + star.width &&
   this.x + this.width > star.x &&
   this.y < star.y + star.height &&
   this.height + this.y > star.y){

      star.collision();


      }

      //condition for winning
      if(this.score >= 500){

    game.winGameEfx.play();

                       alert("You win!");
                       this.score = 0;
                       document.getElementById('score').innerHTML = this.score;
                       this.lives = 3;
                       document.getElementById('lives').innerHTML = this.lives;
                       this.reset();

                     }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies = [new Enemy(0, 70)
];
// ,new Enemy (0,90),new Enemy(0,100),new Enemy(200,300), new Enemy(100, 120), new Enemy(140, 200), new Enemy(202, 210), new Enemy(0, 180), new Enemy(50,300),new Enemy(10,300), new Enemy(0,250),new Enemy(100,290)
    allEnemies.push(new Enemy());

// Place the player object in a variable called player

var player = new Player();


//Star - objects that player should collect to win.
var Star = function(){
  this.x = Math.random() * (250 - 10) + 10;
  this.y = Math.random() * (250 - 10) + 50;
    this.width = 75;
    this.height = 50;
    this.sprite = 'images/char-pink-girl.png';
    // this.x = 80;
    // this.y = 80;
};



Star.prototype.update = function(){
    //  this.y = 60;
    //  this.x = 200;
    var that = this;
    a = Math.floor((Math.random()*7)+ 0)*101;
    b = (Math.floor((Math.random()*3)+ 1)*83)-20;
//checking the boundary of the canvas
    if (a>606 && a>909 && b>606 && b>909){
      that.x = a;
      that.y = b;

    }

};

//for reset
Star.prototype.reset = function(){
          //
          this.y = Math.floor(Math.random()*  320); // resets gem to different points on canvas
          this.x = Math.floor(Math.random() * 750);
          console.log(this.x,this.y);
//           var that = this; that.x = 100;
// that.y = 200;


        }




//Check for Collision between star and player.
Star.prototype.collision = function(target) {

 // for(var i=0; i<star.length; i++){
 //   if(star[i].x<player.x + this.width && star[i].x + star[i].width>player.x && star[i].y <player.y + this.height && star[i].height + star[i].y > player.y) {
 //     player.score = +1;
 //     document.getElementById("score").innerHTML =  player.score;  // updates the score
 //     //remove the caught gem
 //     star[i].splice(i,1);
 //         isCollision = true;
 //         star.reset();

         // Gem collision on different points on the canvas.

                 Star.prototype.collision = function() {

                     if(player.x < this.x + this.width &&
                     player.x + player.width > this.x &&
                     player.y < this.y + this.height &&
                     player.height + player.y > this.y);

                       console.log("got a gem!");
                       console.count("Gem collision");
game.getGemEfx.play();
                       player.score += 50;
                       document.getElementById("score").innerHTML =  player.score;  // updates the score
                       star.reset();

                 };

 //   }
 // }
};



//Update stars when collected by player
// Star.prototype.update = function() {
//     this.collision();
// };

//Draw the star sprite on the screen
Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//Instantiate Star objects and stored in an array.
// var star = [new Star(0,70), new Star(100,120)];
for(var i = 0; i < 4; i++){
    var star = new Star(i);
    // star.push(new Star);
 }


//add star.render() in function renderEntities() {} and star.update() in function updateEntities(dt) in engine.js


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        13: 'enter',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (play === false) {
        selector.handleInput(allowedKeys[e.keyCode]);
    }
    else {
        player.handleInput(allowedKeys[e.keyCode]);
    }

    //  player.handleInput(allowedKeys[e.keyCode]);
});
