
var elBtn = document.getElementById("runningBtn");
var ifWin = false;

// Initialize btn's position and text.
function initBtn(){
	elBtn.innerHTML = "Click Me";
	elBtn.style.left = window.innerWidth / 2 + "px";
	elBtn.style.top = window.innerHeight / 2 + "px";
	// Handle both right and left click for the 
	// ctrl+click = right click problem on mac.
	elBtn.onmousedown = handleMouseDown;
}

//Send congratulations when the button is clicked.
//Restart the game if user clicks after he already won.
function handleMouseDown(event){
	var elMsg = document.getElementById("msg");

	if(!ifWin){
		ifWin = true;
		elBtn.innerHTML = "Play agin!";
		elMsg.className = "visible";
	}else{
		ifWin = false;
		elMsg.className = "hidden";
		initBtn();
	}

}  
function handleMouseMove(event){
	if(!event.ctrlKey && !ifWin){
		moveButton(event.clientX, event.clientY);
	}
}

function moveButton(mouseX, mouseY){
	// var elBtn = document.getElementById("runningBtn");
	//get the current location of button
	var left = parseInt(elBtn.style.left, 10);
	var top = parseInt(elBtn.style.top, 10);

	//calculate the movement
	var rawVector = [left - mouseX, top - mouseY];
	var norm = Math.sqrt(Math.pow(rawVector[0],2) + Math.pow(rawVector[1],2));
	var scale = 800; //scale the movement
	var movement = rawVector.map(function(c){
		 //the moved distance will depand on the current distance.
		 //The nearer the button is to the mouse, the further button will move away. 
		 return c/Math.pow(norm, 2) * scale;
		});

	//compute the new location
	var newLoc = [left, top];
	for(var i = 0; i < 2; i++){
		newLoc[i] += movement[i];
	}
	var sizes = [window.innerWidth, window.innerHeight];
	for (i = 0; i < 2; i++){
		if (newLoc[i] < sizes[i] / 5) {
			newLoc[i] = sizes[i] * 2 / 3;
		}
		if (newLoc[i] > sizes[i] * 4 / 5) {
			newLoc[i] = sizes[i] / 3;
		}
	}

	//set button's positin
	elBtn.style.left = newLoc[0] + "px";
	elBtn.style.top = newLoc[1] + "px";
}


window.onload = function(){
	// Disable default right click behaviour for mac.
	document.onmousedown = function(event) {
		if(event.button == 2) {
			return false;
		}
	};
	initBtn();
	window.onmousemove = handleMouseMove;
};

