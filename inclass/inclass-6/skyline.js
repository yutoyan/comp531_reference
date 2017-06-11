// 'use strict'

var createApp = function(canvas) { 
	var c = canvas.getContext("2d");

	// Create the ground
	var floor = canvas.height/2;
	var grad = c.createLinearGradient(0,floor,0,canvas.height);
	grad.addColorStop(0, "green");
	grad.addColorStop(1, "black");
	c.fillStyle=grad;
	c.fillRect(0, floor, canvas.width, canvas.height);

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3;
	var windowHeight = 5, windowWidth = 3;

	// colors of buildings
	var blgColors = ['#663300', 'blue', 'gray', 'lime','#006600'] ;
	var windowColors = ['yellow', 'black'];

	var blgList = [];

	//build a building. Add building info to blg list without actually drawing it.
	var build = function() { 
		var x0 = Math.random()*canvas.width;
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*12);
		var blgHeight = Math.random()*canvas.height/3;
		var blgStyle = blgColors[ Math.floor(Math.random()*blgColors.length)];
		//Save the building info for further growing.
		var building = {
			x0: x0,
			blgWidth:blgWidth,
			blgHeight:blgHeight,
			blgStyle: blgStyle
		};
		blgList.push(building);
	};
	
	//Redraw all buidlings including lights stored in blgList
	function drawBuildings(){
		blgList.forEach(function(blg){
			c.fillStyle = blg.blgStyle;
			drawBulding(blg);
			drawLights(blg);
		});
	}

	//Check if the mouse is within the range of target buildng.
	function ifBlg(blg, mouseX, mouseY){
		if (blg.x0 < mouseX 
			&& blg.x0 + blg.blgWidth > mouseX 
			&& mouseY < floor 
			&& mouseY > floor - blg.blgHeight){
			return true;
		} else {
			return false;
		}
	}	

	function drawLights(blg){	
		for (var y = floor - floorSpacing; y > floor - blg.blgHeight; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < blg.blgWidth - windowWidth; x += windowSpacing + windowWidth) {
				c.fillStyle= windowColors[ Math.floor(Math.random()*windowColors.length)];
				c.fillRect(blg.x0 + x, y - windowHeight, windowWidth, windowHeight);
			}
		}	
	}

	function drawBulding(blg){
		c.fillRect(blg.x0, floor - blg.blgHeight, blg.blgWidth, blg.blgHeight);
	}

	//Grow the buidling selected by changing its height without actually drawing 
	//it immediately.
	function growBlg(e){
		var mouseX = e.clientX;
		var mouseY = e.clientY - 30;
		blgList.forEach(function(curBlg){
			if( ifBlg(curBlg, mouseX, mouseY) ){
				if (curBlg.blgHeight + floor < canvas.height){
					curBlg.blgHeight += 10;
				}
			}
		});
	}

	//Draw a moving sun.
	var sunX = 0; 
	var sunY_bench = canvas.height/3;

	function drawSun(){
		sunX = sunX + 1;
		sunY = sunY_bench * Math.sin(sunX/100) /2 + canvas.height/4;
		if (sunX > canvas.width){
			sunX = 0;
		}
		c.fillStyle = "#ff9900";
		c.beginPath();
		c.arc(sunX,sunY,20,0,2*Math.PI);
		c.stroke();
		c.fill();
	}

	//Draw a moving car.
	var carX = 10;
	var tyreRadius = 6;
	var carY = floor - 2 * tyreRadius;
	var size = 20;

	function drawCar(){
		carX += 3;
		if (carX > canvas.width){
			carX = 0;
		}
		c.fillStyle = "#996633";
		c.beginPath();
		c.moveTo(carX, carY);
		c.lineTo(carX + 2 * size, carY);
		c.lineTo(carX + 2 * size, carY - 1 * size);
		c.lineTo(carX + 1.5 * size, carY - 1 * size);
		c.lineTo(carX + 1.5 * size, carY - 1.5 * size);
		c.lineTo(carX - 0.5 * size, carY - 1.5 * size);
		c.lineTo(carX - 0.5 * size, carY - 1 * size);
		c.lineTo(carX - 1 * size, carY -1 * size);
		c.lineTo(carX - 1 * size, carY);
		c.closePath();
		c.stroke();
		c.fill();
		c.fillStyle = "#663300";
		c.beginPath();
		c.arc(carX,carY + tyreRadius ,tyreRadius,0,2*Math.PI);
		c.arc(carX + 1 * size,carY + tyreRadius ,tyreRadius,0,2*Math.PI);
		c.fill();
	}

	//Draw the sky.
	function drawSky(){
		var grad = c.createLinearGradient(0,0,0,floor);
		grad.addColorStop(0, "#000099");
		grad.addColorStop(1, "#3399ff");
		c.fillStyle=grad;
		c.fillRect(0, 0, canvas.width, floor);

	}

	//Draw everything but the floor.
	function drawEverything(){
		drawSky();
		drawSun();
		drawBuildings();
		drawCar();
	}

	return {
		build: build,
		grow: growBlg,
		animate: drawEverything
	};

};

window.onload = function() {
	var canvas = document.querySelector("canvas");
	var app = createApp(canvas);
	document.getElementById("build").onclick = app.build;
	canvas.onclick = app.grow;
	setInterval(app.animate, 100);
};




