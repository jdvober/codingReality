// Starting values
let bgColor = "gray";

let circleX = 100; // Starting pos x
let circleY = 100; // Starting pos y
let circleRadius = 10;

let squareX = 1200;
let squareY = 500;
let squareW = 20;
let squareH = 20;

let squareColor = "green"
let squareColorBorder = "black";

let score = -1;
let highscore = 0;

let walls = []
let numWalls = 75

let circleMultiplier = 1
let squareMultiplier = 1
let squareDirection = 1

let circleWallCollideTimeRemaining
let squareControlsReversedTimeRemaining = 0

let startingFrame = 0

function setup () {
	frameRate( 120 )
	// Values that are calculated only once, at the beginning
	createCanvas( windowWidth, windowHeight );
	noCursor()

	// Make random walls
	for ( i = 0; i < numWalls; i++ ) {
		r = new wallObj( random( width ), random( height ), random( 20, 75 ), random( 20, 75 ) ) // generate a wallObj
		walls.push( r ); //add it to the array.
	}

}

function draw () {
	circleRadius = 10 + ( ( frameCount - startingFrame ) / 25 )
	background( bgColor );
	// Check if they are colliding
	const squareCenterX = squareX + ( squareW / 2 )
	const squareCenterY = squareY + ( squareY / 2 )

	const centerToCenterDist = dist( circleX, circleY, squareCenterX, squareCenterY )


	for ( i = 0; i < numWalls; i++ ) {
		walls[ i ].disp();
		walls[ i ].collideCircle();
		walls[ i ].collideSquare();
	}

	// Decay movement slowdown for circle
	circleWallCollideTimeRemaining = circleWallCollideTimeRemaining - ( 1 / frameRate() )
	if ( circleWallCollideTimeRemaining >= 0 ) {
		circleMultiplier = map( circleWallCollideTimeRemaining, 1, 0, 0.15, 1 )
	} else {
		circleMultiplier = 1
	}

	squareControlsReversedTimeRemaining = squareControlsReversedTimeRemaining - ( 1 / frameRate() )
	if ( squareControlsReversedTimeRemaining >= 0 ) {
		SquareMultiplier = 1 - ( squareControlsReversedTimeRemaining )
		squareDirection = -1
	} else {
		squareDirection = 1
	}

	const tag = collideRectCircle( squareX, squareY, squareW, squareH, circleX, circleY, circleRadius );

	// Red background on hit
	if ( tag === true ) {
		bgColor = "#6f1a07";
		circleMultiplier = 0
		squareMultiplier = 0
		resetGame()
	} else {
		bgColor = "gray";
		score++;
	}

	// Fill square rgb based on position of X and Y of circle
	fill( map( centerToCenterDist, 0, sqrt( width ** 2 + height ** 2 ), 255, 0 ), map( centerToCenterDist, 0, sqrt( width ** 2 + height ** 2 ), 0, 255 ), 8 - ( centerToCenterDist / 8 ) );
	stroke( squareColorBorder );
	strokeWeight( 2 );
	rect( squareX, squareY, squareW, squareH );

	stroke( "black" );
	strokeWeight( 1.5 );

	// Fill circle based on time remaining of slowdown
	frameCount < 1 ? fill( 0, 128, 0 ) : fill( map( circleWallCollideTimeRemaining, 0, 1.25, 0, 255 ), map( circleWallCollideTimeRemaining, 0, 1.25, 255, 0 ), map( circleWallCollideTimeRemaining, 0, 1.25, 8, 0 ) );
	circle( circleX, circleY, circleRadius );

	// How to move the circle with WASD
	//D = 68 -> right
	if ( keyIsDown( 68 ) && circleX + circleRadius + 5 <= width ) {
		circleX = circleX + ( 10 * circleMultiplier );
	}

	//A = 65 -> left
	if ( keyIsDown( 65 ) && circleX - circleRadius >= 5 ) {
		circleX = circleX - ( 10 * circleMultiplier );
	}

	// W = 87 -> up
	if ( keyIsDown( 87 ) && circleY - circleRadius >= 5 ) {
		circleY = circleY - ( 10 * circleMultiplier );
	}

	// S = 83 -> down
	if ( keyIsDown( 83 ) && circleY + circleRadius + 5 <= height ) {
		circleY = circleY + ( 10 * circleMultiplier );
	}

	// How to move the square with arrows
	if ( keyIsDown( RIGHT_ARROW ) ) {
		let nextFrameSquareX = squareX + ( 12 * squareMultiplier * squareDirection )
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
	text( `Score: ${ score }`, width - textWidth( score ) - 205, 64 );
	textSize( 32 );
	text( `High Score: ${ highscore }`, textWidth( highscore ) - 10, 32 );
}

function wallObj ( x, y, w, h ) {
	this.x = x
	this.y = y
	this.w = w
	this.h = h
	this.color = color( random( 255 ), random( 255 ), random( 255 ) )
	this.hit = false;

	this.collideSquare = function () {

		this.hitSquare = collideRectRect( this.x, this.y, this.w, this.h, squareX, squareY, squareW, squareH );

		if ( this.hitSquare ) {
			// Set the starting frame for the slowdown
			squareControlsReversedTimeRemaining = .125
			this.w = this.w * 0.95
			this.h = this.h * 0.95
		}
	}

	this.collideCircle = function () {

		this.hitCircle = collideRectCircle( this.x, this.y, this.w, this.h, circleX, circleY, circleRadius );

		if ( this.hitCircle ) {
			// Set the starting frame for the slowdown
			circleWallCollideTimeRemaining = 1
			this.w = this.w * 0.99
			this.h = this.h * 0.99
		}
	}

	this.disp = function () {
		noStroke();
		fill( this.color );
		rect( this.x, this.y, this.w, this.h );
	}

}

function resetGame () {

	// Pause for a hot second, then start a new round
	setTimeout( () => {

		if ( score > highscore ) {
			highscore = score
		}
		startingFrame = frameCount
		circleX = 100; // Starting pos x
		circleY = 100; // Starting pos y
		squareX = 1200;
		squareY = 500;
		score = -1;


		walls = []
		numWalls = 75

		circleMultiplier = 1
		squareMultiplier = 1
		squareDirection = 1

		circleWallCollideTimeRemaining = 0
		squareControlsReversedTimeRemaining = 0
		// Make random walls
		for ( i = 0; i < numWalls; i++ ) {
			r = new wallObj( random( width ), random( height ), random( 20, 75 ), random( 20, 75 ) ) // generate a wallObj
			walls.push( r ); //add it to the array.
		}
	}, 1500 );
}

