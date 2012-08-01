/*
 * Metro-tiles:  Css3 windows metro tiles
 * Author     :  Tim Holman
 * @Author    :  @twholman
 */

function Tile( element ){
	
	// Tile element	
	var tile = element;

	// Global settings

	// Declare css for when the tile is in its idle state.
    var idleCss = "perspective( 800px ) rotate3d(0, 0, 0, 0deg)";


	var initialize = function() {


		// Set transform origin to the center of the element.
		tile.style.transformOrigin = "50% 50%";
		tile.style.oTransformOrigin = "50% 50%";
		tile.style.msTransformOrigin = "50% 50%";
		tile.style.MozTransformOrigin = "50% 50%";
		tile.style.webkitTransformOrigin = "50% 50%";

		// Make sure the parent preserves the 3d perspective
		tile.style.transformStyle = "preserve-3d";
		tile.style.oTransformStyle = "preserve-3d";
		tile.style.msTransformStyle = "preserve-3d";
		tile.style.MozTransformStyle = "preserve-3d";
		tile.style.webkitTransformStyle = "preserve-3d";

		// Set element transform times
		tile.style.transition = "transform 0.08s";
		tile.style.oTransition = "-o-transform 0.08s";
		tile.style.msTransition = "-ms-transform 0.08s";
		tile.style.MozTransition = "-moz-transform 0.08s";
		tile.style.webkitTransition = "-webkit-transform 0.08s";

		tile.style.transform = idleCss;
		tile.style.oTransform = idleCss;
		tile.style.msTransform = idleCss;
		tile.style.MozTransform = idleCss;
		tile.style.webkitTransform = idleCss;
		
		// Make transforms look antialiased/smoother in firefox
		tile.style.outline = "1px solid transparent";

		// Listen to mouse events for the tile.
		tile.addEventListener('mousedown', MouseDown, false);
		tile.addEventListener('mouseup',   MouseUp,   false);
		tile.addEventListener('mouseout',  MouseUp,   false);
	}


	var pushTile = function( x, y ){

		// Get the elements width and height.
		var width = tile.offsetWidth;
		var height = tile.offsetHeight;

		var translateString = "perspective( 800px ) ";
		

		/*  Tilt based on position clicked
		 *  
		 *  Not quite sure how msft do this, but here's my logic:
		 *
		   *  If the click is closer to the left, right, top or bottom:
		   *    Then tilt in that direction
		   *
		   *  Unless the click is in the middle quater of the tile:
		   *    In which case, push the tile down.
		   *
		 */

		// If the click is in the center quater of the element, push down.
		if ( x > width/4 && x < (width/4 * 3) && y > height/4 && y < (height/4 * 3) ) {

			translateString += "rotate3d(0, 0, 0, 0deg) translateZ( -30px )";
		}
		
		// is the user closer to the right/left hand side?
		else if ( Math.min( x, width - x) < Math.min( y, height - y) ) {

			// Tilt on the left side
			if ( x < width - x ) {

				translateString += "rotate3d(0, -1, 0, 20deg)";

			// Tilt on the right side
			} else {

				translateString += "rotate3d(0, 1, 0, 20deg)";
			}

		// the user is closer to the top/bottom side (also the default)
		} else {

			// Tilt on the top
			if ( y < height - y ) {

				translateString += "rotate3d(1, 0, 0, 20deg)";

			// Tilt on the bottom
			} else {

				translateString += "rotate3d(-1, 0, 0, 20deg)";
			}
		}

		// Apply transformation to tile.
		tile.style.webkitTransform = translateString;
		tile.style.MozTransform = translateString;
		tile.style.msTransform = translateString;
		tile.style.oTransform = translateString;
		tile.style.transform = translateString;
											
	};
	
	var MouseDown = function( event ){

		var x = event.offsetX || ( event.layerX - tile.offsetLeft );
		var y = event.offsetY || ( event.layerY - tile.offsetTop  ); 

		console.log( event );

		pushTile( x, y );
	};
	

	var MouseUp = function( event ){

		// Set the element to its idle state
		tile.style.webkitTransform = idleCss;
		tile.style.MozTransform = idleCss;
		tile.style.msTransform = idleCss;
		tile.style.oTransform = idleCss;
		tile.style.transform = idleCss;
	};
	
	// Initialize the tile.
	initialize();
}

// Function to return the relative click coodinates of an element.
function relMouseCoords(event){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do{
        totalOffsetX += currentElement.offsetLeft;
        totalOffsetY += currentElement.offsetTop;
    }
    while(currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return {x:canvasX, y:canvasY}
}
Element.prototype.relMouseCoords = relMouseCoords;



// Find all tile elements
var tileElements = document.getElementsByClassName( 'metro-tile' );
var i;

// Apply tile functions 
for ( i = 0; i < tileElements.length; i++ ) {

	Tile( tileElements[i] );

}