//Some global constants
var spaceKey = 32;
var leftArrow = 37;
var rightArrow = 39;
var pause = false;
var gameResults = "";
var BOMB= false; //for cheating button in the game

function Game (canvas, image) {

	//Base settings for level 1. All level will be increased based on this base configuration.
	this.config = {

		// (difficultyRate * level + 1) gives the multiplier for increaseing diffulities, which will be used to incrase the shooting frequency and
		// velocity.
		difficultyRate: 0.3,
		frequency: 50,//Updating times per second

		//Score = (difficultyRate * level + 1) * baseScore
		ScorePerSquirrel: 5,
		levelReward: 20,

		//state information related to squirrels
		squirrelRows: 3,//constant
		squirrelColumns: 8,//constant
		squirrelVelocity: 20,
		// squirrelDroppingDistance: 10,
		nutRate: 0.08,
		nutVelocity: 50,

		//state information related to players //constant
		heartVelocity: 150,
		playerVelocity: 300,		
	};

	//Initialize info related to canvas
	this.canvas = canvas;
	this.c = canvas.getContext("2d");
	this.width = canvas.width;
	this.height = canvas.height;

	//Initialize general info about game statement.
	this.init();

	//initialize level difficulty.
	this.lvlMulitiplier = (this.config.difficultyRate * this.level);
	
	//Increase awards.
	this.curScorePerSquirrel = this.config.ScorePerSquirrel * this.lvlMulitiplier;

	//Increase difficulty.
	this.curSquirrelVelocity = this.config.squirrelVelocity * this.lvlMulitiplier;
	this.curNutRate = this.config.nutRate * this.lvlMulitiplier;
	this.curNutVelocity = this.config.nutVelocity * this.lvlMulitiplier;
	
	//Initialize the pictures for all roles.
	this.nutPic = new Pic(image,120, 68, 150, 155);
	this.heartPic = new Pic(image, 27,22,44,37);
	this.playerPic = new Pic(image, 270, 47, 171, 176);
	this.squirrelPic = new Pic(image, parseInt(456), parseInt(0),parseInt(239) , parseInt(223));

	//Dimension constants
	this.squirrelWidth = 30;
	this.squirrelHeight = 30;
	this.playerWidth = 50;
	this.playerHeight = 50;
	this.heartWidth = 7;
	this.heartHeight = 7;
	this.nutWidth = 7;
	this.nutHeight = 7;

	//For moving squirrel downwards
	this.rowWidth = 40;
}

Game.prototype.init = function() {
	this.lives = 3;
	this.score = 0;
	this.level = 1;
	this.pressedKeys = {};
	this.curStage = new WelcomeStage();
};

//Set the velocity and rewards based on the level of game.
Game.prototype.setLevelDifficulty = function() {
	//Initialize the cur level data.
	this.lvlMulitiplier = (this.config.difficultyRate * this.level + 1);
	
	//Increase awards.
	this.curScorePerSquirrel = this.config.ScorePerSquirrel * this.lvlMulitiplier;

	//Increase difficulty.
	this.curSquirrelVelocity = this.config.squirrelVelocity * this.lvlMulitiplier;
	this.curNutRate = this.config.nutRate * this.lvlMulitiplier;
	this.curNutVelocity = this.config.nutVelocity * this.lvlMulitiplier;
	
};

Game.prototype.start = function() {
	this.init();
	var game = this; //in order to pass the game object into gameLoop
	this.interval = setInterval(function() {
		game.gameLoop();
	}, 1000 /game.config.frequency);
};

Game.prototype.gameLoop = function(){
	var dt = 1000 /this.config.frequency;
	if(!pause){
	this.curStage.update(this, dt);
	this.curStage.render(this, dt);}
};

Game.prototype.stop = function Stop() {
	clearInterval(this.intervalId);
};

Game.prototype.keyDown = function(keyCode) {
	this.pressedKeys[keyCode] = true;
	if(this.curStage.keyDown) {
		this.curStage.keyDown(this, keyCode);
	}
};

Game.prototype.keyUp = function(keyCode) {
	delete this.pressedKeys[keyCode];
	if(this.curStage.keyUp) {
		this.curStage.keyUp(this, keyCode);
	}
};

window.onload = function() {
	//Create canvas with the device resolution.
	var PIXEL_RATIO = (function () {
		var c = document.createElement("canvas").getContext("2d"),
		dpr = window.devicePixelRatio || 1,
		bsr = c.webkitBackingStorePixelRatio ||
		c.mozBackingStorePixelRatio ||
		c.msBackingStorePixelRatio ||
		c.oBackingStorePixelRatio ||
		c.backingStorePixelRatio || 1;
		return dpr / bsr;
	})();

	createHiDPICanvas = function(w, h, ratio) {
		if (!ratio) { ratio = PIXEL_RATIO; }
		var canvas = document.createElement("canvas");
		canvas.width = w * ratio;
		canvas.height = h * ratio;
		canvas.style.width = w + "px";
		canvas.style.height = h + "px";
		canvas.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
		return canvas;
	};

	var canvas = createHiDPICanvas(800, 600);
	var info = document.getElementById("info");
	document.body.insertBefore(canvas, info);

	var pic = new Image();
	pic.src = "squirrel.png";

	//Start the game after the picture has been loaded.
	pic.onload = function(){
		var game = new Game(canvas, pic);
		game.start();

		//Listen for the keyboard events of three controlling keys.
		window.onkeydown = function keyDown(e) {
			var keycode = e.keyCode;
            //Disable default bahavior
            if(keycode == spaceKey || keycode == leftArrow || keycode == rightArrow) {
            	e.preventDefault();
            	game.keyDown(keycode);
            }};
            window.onkeyup = function keyUp(e) {
            	var keycode = e.keyCode;
            	game.keyUp(keycode);
            };
        };	
    var pauseBtn = document.getElementById("pauseBtn");
    pauseBtn.onclick = function(){
    	//Now if it is not paused, pause the update process and change the 
    	// button value to "continue".
    	if(!pause){
    		pause = true;
    		pauseBtn.innerHTML = "continue";
    	}else{
    		pause = false;
    		pauseBtn.innerHTML = "pause";
    	}
    };
    var bombBtn = document.getElementById("bomb");
    bombBtn.onclick = function(){
    		BOMB = true;
    };
    };