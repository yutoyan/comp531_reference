//Pic object saves the position info of its picture in the image given
function Pic(img, x, y, w, h){
	this.image = img;
	this.picX = x;
	this.picY = y;
	this.picW = w;
	this.picH = h;
}

Pic.prototype.draw = function(c, x, y, w,h) {
	c.imageSmoothingEnabled = false;
	c.drawImage(this.image, parseInt(this.picX), parseInt(this.picY), parseInt(this.picW), parseInt(this.picH), parseInt(x), parseInt(y), parseInt(w), parseInt(h));
};

/**
* Nut 
* thrown by squirrels.
**/
function Nut(nutPic, x, y, width, height, velocity){
	this.pic = nutPic;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.velocity = velocity;
}

Nut.prototype.draw = function(ctx) {
	this.pic.draw(ctx, this.x, this.y, this.width, this.height);	
};
/**
* Heart
* thrown by players.
**/
function Heart(heartPic, x, y, width, height, velocity){
	this.pic = heartPic;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.velocity = velocity;
}

Heart.prototype.draw = function(ctx) {
	this.pic.draw(ctx, this.x, this.y, this.width, this.height);	
};

function Player(playerPic, x, y, width, height){
	this.pic = playerPic;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

Player.prototype.draw = function(ctx) {
	this.pic.draw(ctx, this.x, this.y, this.width, this.height);
	
};

function Squirrel(squirrelPic, x, y, width, height, row, column){
	this.pic = squirrelPic;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.row = row;
	this.column = column;
}

Squirrel.prototype.draw = function(ctx) {
	this.pic.draw(ctx, this.x, this.y, this.width, this.height);
	
};

