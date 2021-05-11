/*
See the file Notes.md included with this code for an introduction and explination of what is going on, beyond the included comments.
*/

function setup () {
	createCanvas( 800, 800 );
}

function draw () {
	// Continuously draws things to the screen in the order they are listed.

	// First draw a blank background. This erases whatever was there before!
	background( 256 );

	// We can draw a circle...
	circle( 120, 120, 200 ) // x, y, diameter in pixels

	// Or rectangles...
	rect( 30, 20, 55, 55 ); // x, y, w, h
	rect( 330, 20, 100, 100, 30 ); // x, y, w, h, corner radius

	// We can mess with colors, line weights etc. Check the docs for more possibilities!
	strokeWeight( 5 )
	rect( 330, 20, 100, 100, 30 ); // x, y, w, h, corner radius
	strokeWeight( 1 )
}
