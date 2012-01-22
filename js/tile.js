//
// Tile.js - Css3 windows metro tiles
// Author    : Tim Holman
// @Author   : @twholman
// WWWAuthor : http://tholman.com
//
function Tile(id){
		
	var tile = document.getElementById(id);
	var mouse = {x: 0, y: 0, down: false};
	var width  = tile.offsetWidth;
	var height = tile.offsetHeight;
	var maxRotation = 22;


	var setRotation = function(){
		
		//Rotations as percentages
		var yRotation = (mouse.x - (width / 2)) / (width / 2);
		var xRotation = (mouse.y - (height / 2)) / (height / 2);
		
		tile.style.webkitTransform = "rotateX("  + -xRotation * maxRotation + "deg)" +
									" rotateY("  + yRotation * maxRotation + "deg)";
									
		tile.style.mozTransform = "rotateX("  + -xRotation * maxRotation + "deg)" +
									" rotateY("  + yRotation * maxRotation + "deg)";
									
		tile.style.transform = "rotateX("  + -xRotation * maxRotation + "deg)" +
									" rotateY("  + yRotation * maxRotation + "deg)";
									
		
	};
	
	var MouseDown = function(e){
		mouse.x = e.offsetX;
		mouse.y = e.offsetY;
		setRotation();
	};
	
	var MouseUp = function(e){
		tile.style.webkitTransform = "rotateX(0deg)" +
									" rotateY(0deg)";
									
		tile.style.mozTransform = "rotateX(0deg)" +
                                  " rotateY(0deg)";

		tile.style.transform = "rotateX(0deg)" +
                               " rotateY(0deg)";
	};
	

	var addRequiredCss = function(){
		tile.style.webkitPerspective = 0;
		tile.style.webkitTransformStyle = "preserve-3d";
		tile.style.webkitTransition = "-webkit-transform 0.1s";
	};
	
	addRequiredCss();
	tile.addEventListener('mousedown', MouseDown, false);
	tile.addEventListener('mouseup', MouseUp, false);
	tile.addEventListener('mouseout', MouseUp, false);
}
