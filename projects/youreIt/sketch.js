// Starting values
let bgColor = "gray";

let circleX = 100; // Starting x pos of the circle
let circleY = 100; // Starting y pos of the circle
let circleRadius = 10;

let squareX = 1200;
let squareY = 500;
let squareW = 20;
let squareH = 20;

let time = -1;
let bestTime = 0;

let walls = [] // This will hold all of our wall objects
let numWalls = 75

let circleMultiplier = 1 // Multiplier for the slowdown when circle hits the wall
let squareMultiplier = 1 // Multiplier for when the square hits the wall
let squareDirection = 1 // A switch for reversing controls when a square hits a wall

let circleWallCollideTimeRemaining = 0
let squareControlsReversedTimeRemaining = 0

let startingFrame = 0

function setup () {
	// Values that are calculated only once, at the beginning
	//
	frameRate( 240 ) // Quadruple the normal framerate for smoother gameplay
	createCanvas( windowWidth, windowHeight ); // Create the area where we will draw the graphics
	noCursor() // Gets rid of the mouse cursor

	// Make random walls
	for ( i = 0; i < numWalls; i++ ) {
		r = new wallObj( random( width ), random( height ), random( 20, 75 ), random( 20, 75 ) ) // generate a wallObj
		walls.push( r ); //add it to the array.
	}

}

function draw () {
	circleRadius = 10 + ( ( frameCount - startingFrame ) / 12 ) // a dynamic radius that grows over time, thus making it harder to stay away the longer the round goes on.
	// circleRadius = 10 + ( ( frameCount - startingFrame ) / 25 ) // a dynamic radius that grows over time, thus making it harder to stay away the longer the round goes on.
	background( bgColor );
	// Check if they are colliding
	const squareCenterX = squareX + ( squareW / 2 )
	const squareCenterY = squareY + ( squareY / 2 )

	const centerToCenterDist = dist( circleX, circleY, squareCenterX, squareCenterY )


	// Check collision for each wallObj, and display them with their latest state
	for ( i = 0; i < numWalls; i++ ) {
		walls[ i ].disp();
		walls[ i ].collideCircle();
		walls[ i ].collideSquare();
	}

	// Decay movement slowdown for circle
	circleWallCollideTimeRemaining = circleWallCollideTimeRemaining - ( 1 / frameRate() )
	if ( circleWallCollideTimeRemaining >= 0 ) {
		circleMultiplier = map( circleWallCollideTimeRemaining, 1, 0, 0.05, 1 )
	} else {
		circleMultiplier = 1
	}

	// Decay movement slowdown for square
	squareControlsReversedTimeRemaining = squareControlsReversedTimeRemaining - ( 1 / frameRate() )
	if ( squareControlsReversedTimeRemaining >= 0 ) {
		SquareMultiplier = map( squareControlsReversedTimeRemaining, 1, 0, 0.15, 1 )
		squareDirection = -1
	} else {
		squareDirection = 1
		squareMultiplier = 1
	}

	// Check if there has been a Tag
	const tag = collideRectCircle( squareX, squareY, squareW, squareH, circleX, circleY, circleRadius );

	// Red background on tag
	if ( tag === true ) {
		bgColor = "#6f1a07";
		circleMultiplier = 0
		squareMultiplier = 0
		resetGame() // start a new round after a successful tag
	} else {
		bgColor = "gray";
		time++;
	}

	// Fill square rgb based on position of X and Y of circle.  The closer the opponent, the more red.  The further away, the more green.
	fill( map( centerToCenterDist, 0, sqrt( width ** 2 + height ** 2 ), 255, 0 ), map( centerToCenterDist, 0, sqrt( width ** 2 + height ** 2 ), 0, 255 ), 8 - ( centerToCenterDist / 8 ) );
	stroke( `${ squareControlsReversedTimeRemaining > 0 ? "red" : "green" }` );
	strokeWeight( 2 );
	rect( squareX, squareY, squareW, squareH );

	stroke( "black" );
	strokeWeight( 1.5 );

	// Fill circle based on time remaining of slowdown.  Lots of slowdown time remaining -> red, top speed -> green
	frameCount < 1 ? fill( 0, 128, 0 ) : fill( map( circleWallCollideTimeRemaining, 0, 1.25, 0, 255 ), map( circleWallCollideTimeRemaining, 0, 1.25, 255, 0 ), map( circleWallCollideTimeRemaining, 0, 1.25, 8, 0 ) );
	circle( circleX, circleY, circleRadius );

	// How to move the circle with WASD
	// D = 68 -> right
	if ( keyIsDown( 68 ) ) {
		// Make sure
		if ( circleX + circleRadius / 2 + ( 10 * circleMultiplier ) < width ) {
			circleX = circleX + ( 10 * circleMultiplier );
		} else {
			circleX = width - circleRadius / 2
		}
	}

	// A = 65 -> left
	if ( keyIsDown( 65 ) ) {
		if ( circleX - circleRadius / 2 - ( 10 * circleMultiplier ) > 0 ) {
			circleX = circleX - ( 10 * circleMultiplier );
		} else {
			circleX = circleRadius / 2
		}

	}

	// W = 87 -> up
	if ( keyIsDown( 87 ) ) {
		if ( circleY - circleRadius / 2 - ( 10 * circleMultiplier ) > 0 ) {
			circleY = circleY - ( 10 * circleMultiplier );
		} else {
			circleY = circleRadius / 2
		}

	}

	// S = 83 -> down
	if ( keyIsDown( 83 ) ) {
		if ( circleY + circleRadius / 2 + ( 10 * circleMultiplier ) < height ) {
			circleY = circleY + ( 10 * circleMultiplier );
		}
	}

	// How to move the square with arrow keys
	if ( keyIsDown( RIGHT_ARROW ) ) {
		// Check to see where the square will be next frame
		let nextFrameSquareX = squareX + ( 12 * squareMultiplier * squareDirection )
		// Check to see if the square will be out of bounds next frame, and only update position if it will still be in play
		if ( width > nextFrameSquareX && nextFrameSquareX > 0 ) {
			squareX = nextFrameSquareX;
		}
	}

	if ( keyIsDown( LEFT_ARROW ) ) {
		let nextFrameSquareX = squareX - ( 12 * squareMultiplier * squareDirection )
		if ( width > nextFrameSquareX && nextFrameSquareX > 0 ) {
			squareX = nextFrameSquareX;
		}

	}

	if ( keyIsDown( UP_ARROW ) ) {
		let nextFrameSquareY = squareY - ( 12 * squareMultiplier * squareDirection )
		if ( height > nextFrameSquareY && nextFrameSquareY > 0 ) {
			squareY = nextFrameSquareY;
		}
	}

	if ( keyIsDown( DOWN_ARROW ) ) {
		let nextFrameSquareY = squareY + ( 12 * squareMultiplier * squareDirection )
		if ( height > nextFrameSquareY && nextFrameSquareY > 0 ) {
			squareY = nextFrameSquareY;
		}
	}

	// Show score / high score last, so it is always on top
	textSize( 64 );
	fill( 255, 255, 255 )
	textAlign( RIGHT )
	text( `Time: ${ ( time / 100 ).toFixed( 2 ) }s`, width - 26, 64 );
	textAlign( LEFT )
	textSize( 32 );
	text( `Best Time: ${ bestTime / 100 } seconds`, textWidth( bestTime ) - 10, 32 );
}

function wallObj ( x, y, w, h ) {
	// Position and dimensions
	this.x = x
	this.y = y
	this.w = w
	this.h = h
	// Random Color
	this.color = color( random( 255 ), random( 255 ), random( 255 ) )
	this.hit = false;

	this.collideSquare = function () {

		// Remove from the field
		if ( this.w < 8 || this.h < 8 ) {
			this.w = 0
			this.h = 0
			this.hit = false
			return
		}
		this.hitSquare = collideRectRect( this.x, this.y, this.w, this.h, squareX, squareY, squareW, squareH );

		if ( this.hitSquare ) {
			// Set the starting frame for the slowdown
			squareControlsReversedTimeRemaining = .75

			// Shrink the size of the object
			let shrinkX = this.w * 1.01
			let shrinkY = this.h * 1.01
			// this.w = shrinkX
			// this.h = shrinkY
			if ( squareX < this.x ) {
				this.x = this.x + shrinkX / 16
			}
			if ( this.x < squareX ) {
				this.x = this.x - shrinkX / 16
			}
			if ( squareY > this.y ) {
				this.y = this.y - shrinkY / 16
			}
			if ( this.y > squareY ) {
				this.y = this.y + shrinkY / 16
			}
		}
	}

	this.collideCircle = function () {

		// Remove from the field
		if ( this.w < 8 || this.h < 8 ) {
			this.w = 0
			this.h = 0
			this.hit = false
			return
		}
		this.hitCircle = collideRectCircle( this.x, this.y, this.w, this.h, circleX, circleY, circleRadius );

		if ( this.hitCircle ) {
			// Set the starting frame for the slowdown
			circleWallCollideTimeRemaining = 1
			// Slowly shrink the size
			let shrinkX = this.w * 0.99
			let shrinkY = this.h * 0.99
			this.w = this.w - ( circleRadius * 0.0375 )
			this.h = this.h - ( circleRadius * 0.0375 )
			if ( circleX < this.x ) {
				this.x = this.x + ( circleRadius / frameRate() ) + shrinkX / frameRate()
			} else {
				this.x = this.x - ( circleRadius / frameRate() ) - shrinkX / frameRate()
			}
			if ( circleY < this.y ) {
				this.y = this.y + ( circleRadius / frameRate() ) + shrinkY / frameRate()
			} else {
				this.y = this.y - ( circleRadius / frameRate() ) - shrinkY / frameRate()
			}
		}
	}


	this.disp = function () {
		// Draw the wall
		noStroke();
		fill( this.color );
		rect( this.x, this.y, this.w, this.h );
	}

}

function resetGame () {

	// Pause for a hot second, then start a new round
	setTimeout( () => {

		if ( time > bestTime ) {
			bestTime = time
		}

		// Note the new "starting" frame.
		startingFrame = frameCount

		// Reset variables
		circleX = 100; // Starting pos x
		circleY = 100; // Starting pos y
		squareX = 1200;
		squareY = 500;
		time = -1;


		walls = []
		numWalls = 75

		circleMultiplier = 1
		squareMultiplier = 1
		squareDirection = 1

		circleWallCollideTimeRemaining = 0
		squareControlsReversedTimeRemaining = 0

		// Make new random walls
		for ( i = 0; i < numWalls; i++ ) {
			r = new wallObj( random( width ), random( height ), random( 20, 75 ), random( 20, 75 ) ) // generate a wallObj
			walls.push( r ); //add it to the array.
		}
	}, 1500 ); // 1.5 second pause, then reset begins
}

