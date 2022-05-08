var mx=0;
var my=0;
var mDown=false
var go=false;
var click=0;

// goal image
var goalReady = false;
var goalImage = new Image();
goalImage.onload = function () {
	goalReady = true;
};
goalImage.src = "goal.png";

// humam image
var hReady = false;
var hImage = new Image();
hImage.onload = function () {
	hReady = true;
};
hImage.src = "humam.png";

// red image
var redReady = false;
var redImage = new Image();
redImage.onload = function () {
	redReady = true;
};
redImage.src = "red.png";

// green image
var greenReady = false;
var greenImage = new Image();
greenImage.onload = function () {
	greenReady = true;
};
greenImage.src = "green.png";

// yellow image
var yellowReady = false;
var yellowImage = new Image();
yellowImage.onload = function () {
	yellowReady = true;
};
yellowImage.src = "yellow.png";

// Create an object to hold the humam properties
var humam = {
	x: 128,
	y: 128,
	hit: false
};

draw_humam = function(){
	if(cells[humam.y/32][humam.x/32]==1){
		x=humam.x/32;
		y=humam.y/32
		dx=0;
		dy=0;
		if(x>0){if(cells[y][x-1]==1){dx++}} //LEFT
		if(x<cells.length-1){if(cells[y][x+1]==1){dx--}} //RIGHT
		if(y>0){if(cells[y-1][x]==1){dy++}} // UP
		if(y<cells.length-1){if(cells[y+1][x]==1){dy--}} //DOWN
		if(y>0 && x>0){if(cells[y-1][x-1]==1){dy++;dx++}} //UP-LEFT
		if(y>0 && x<cells.length-1){if(cells[y-1][x+1]==1){dy++;dx--}} //UP-RIGHT
		if(y<cells.length-1 && x>0){if(cells[y+1][x-1]==1){dy--;dx++}} //DOWN-LEFT
		if(y<cells.length-1 && x<cells.length-1){if(cells[y+1][x+1]==1){dy--;dx--}} //DOWN-RIGHT
		//alert(dx+" , "+dy)
		// moves humam if pushed by cells unless position blocked by live cell
		
		if(dx>0){if(x<cells.length-1){if(cells[y][x+1]==0){humam.x+=32}}}
		if(dx<0){if(x>0){if(cells[y][x-1]==0){humam.x-=32}}}
		if(dy>0){if(y<cells.length-1){if(cells[y+1][x]==0){humam.y+=32}}}
		if(dy<0){if(y>0){if(cells[y-1][x]==0){humam.y-=32}}}
		Tcells[humam.y/32][humam.x/32]=0
		ctx.drawImage(redImage, humam.x, humam.y)
	}
	ctx.drawImage(hImage, humam.x, humam.y);
	if(humam.x==goal.x && humam.y==goal.y){stopCells();goal.x=-1000;alert("YOU WIN!!!!!!!")}
}
// Create an object to hold the goal properties
var goal = {
	x: 256,
	y: 256,
	hit: false
};
draw_goal = function(){
	
	if(cells[goal.y/32][goal.x/32]==1){
		Tcells[goal.y/32][goal.x/32]=0
		ctx.drawImage(redImage, goal.x, goal.y)	
	}
	ctx.drawImage(goalImage, goal.x, goal.y);
}

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 640;
document.body.appendChild(canvas);
//scale
//ctx.scale(2, 2);
// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);
addEventListener("mousedown", function (e) {
	// Capture the position of the click, accounting for canvas position
	mx = e.x - canvas.offsetLeft;
	my = e.y - canvas.offsetTop;
	if(mDown==false){
		mDown=true;
		if(cells[Math.floor(my/32)][Math.floor(mx/32)]==0){cells[Math.floor(my/32)][Math.floor(mx/32)]=1}else{cells[Math.floor(my/32)][Math.floor(mx/32)]=0}
		scoreCells();
	}
}, false);

addEventListener("mouseup", function (e) {
	// Capture the position of the click, accounting for canvas position
	mx = e.x - canvas.offsetLeft;
	my = e.y - canvas.offsetTop;
	mDown=false
}, false);

addEventListener("mousemove", function (e) {
	// Capture the position of the click, accounting for canvas position
	mx = e.x - canvas.offsetLeft;
	my = e.y - canvas.offsetTop;
}, false);

var cells=[[0,0,1,0,0,0,0,0,0,0,0,0],[1,0,1,0,0,0,0,0,0,0,0,0],[0,1,1,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0]];
var Tcells=[[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0]];

draw_cursor = function(){
	ctx.drawImage(yellowImage, Math.floor(mx/32)*32, Math.floor(my/32)*32);
}

drawCells = function(){
	for (var y = 0; y < cells.length; y++) {
		for (var x = 0; x < cells.length; x++) {
			if(cells[y][x]==0){ctx.drawImage(redImage, x*32, y*32)}
			if(cells[y][x]==1){ctx.drawImage(greenImage, x*32, y*32)}
		//	ctx.fillText(Tcells[y][x], x*32, y*32);
	
		}

	}
}
/*
Any live cell with two or three live neighbours survives.
Any dead cell with three live neighbours becomes a live cell.
All other live cells die in the next generation. Similarly, all other dead cells stay dead.
*/
scoreCells = function() {
	for (var y = 0; y < cells.length; y++) {
		for (var x = 0; x < cells.length; x++) {
			life=0
			if(x>0){if(cells[y][x-1]==1){life++}} //LEFT
			if(x<cells.length-1){if(cells[y][x+1]==1){life++}} //RIGHT
			if(y>0){if(cells[y-1][x]==1){life++}} // UP
			if(y<cells.length-1){if(cells[y+1][x]==1){life++}} //DOWN
			if(y>0 && x>0){if(cells[y-1][x-1]==1){life++}} //UP-LEFT
			if(y>0 && x<cells.length-1){if(cells[y-1][x+1]==1){life++}} //UP-RIGHT
			if(y<cells.length-1 && x>0){if(cells[y+1][x-1]==1){life++}} //DOWN-LEFT
			if(y<cells.length-1 && x<cells.length-1){if(cells[y+1][x+1]==1){life++}} //DOWN-RIGHT
			Tcells[y][x]=life;

			
		}
	}
	
	/*
	for (var y = 0; y < cells.length; y++) {
		for (var x = 0; x < cells.length; x++) {
			cells[y][x]=Tcells[y][x]
		}
	}
	*/
	
}
clearCells = function(){
for (var y = 0; y < cells.length; y++) {
		for (var x = 0; x < cells.length; x++) {
			cells[y][x]=0;
			Tcells[y][x]=0;
		}
	
     }
     stopCells();
     
}
playCells = function(){
     go=true;
     temp = document.getElementById("label");
     temp.innerText="RUNNING"
}
stopCells = function(){
     go=false;
     temp = document.getElementById("label");
     temp.innerText="NOT RUNNING"
}
checkCells = function() {
    tvar=0
	for (var y = 0; y < cells.length; y++) {
		for (var x = 0; x < cells.length; x++) {
			if (cells[y][x]==1){
			    tvar++
				if (Tcells[y][x]<2){cells[y][x]=0;tvar--}
				if (Tcells[y][x]>3){cells[y][x]=0;tvar--}
			}else{
				if (Tcells[y][x]==3){cells[y][x]=1;tvar++}
			}
			
		}
	}
    if(tvar==0){stopCells()}
	scoreCells();
}
//alert(cells.length);
var cellNUM=0
scoreCells();