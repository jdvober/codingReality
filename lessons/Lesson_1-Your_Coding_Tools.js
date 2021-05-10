/*

Check out:

https://learnxinyminutes.com/docs/javascript/

for a great rundown of the basics of Javascript (and the rest of the website has similar guides for tons of other languages as well!)

This introduction will be based on the link above

*/




// Single-line comments start with two slashes.
/* Multiline comments start with slash-star,
   and end with star-slash */

// Statements can be terminated by ;
doStuff();

// ... but they don't have to be, as semicolons are automatically inserted
// wherever there's a newline, except in certain cases.
doStuff()

// Because those cases can cause unexpected results, we'll keep on using
// semicolons in this guide.

///////////////////////////////////
// 1. Numbers, Strings and Operators

3; // = 3
1.5; // = 1.5

// Some basic arithmetic works as you'd expect.
1 + 1; // = 2
0.1 + 0.2; // = 0.30000000000000004
8 - 1; // = 7
10 * 2; // = 20
35 / 5; // = 7

// Including uneven division.
5 / 2; // = 2.5

// And modulo (gives remainder) division.
10 % 2; // = 0
30 % 4; // = 2
18.5 % 7; // = 4.5

// Precedence is enforced with parentheses.
( 1 + 3 ) * 2; // = 8

// There are three special not-a-real-number values:
Infinity; // result of e.g. 1/0
-Infinity; // result of e.g. -1/0
NaN; // result of e.g. 0/0, stands for 'Not a Number'

// There's also a boolean type.
// A Boolean value is whenever you have a pair of two values where those are the ONLY two choices:

// true / false, yes / no, on / off, 0 / 1 etc.

true;
false;

// Strings are programmer speak for words, letters, characters, symbols etc.
// Strings are created with ' or ".
'abc';
"Hello, world";

// To get the opposite of a boolean, put the ! symbol before it
!true; // = false
!false; // = true

// Compare two values to see if they are equal to each other by using a triple equals sign. The result will be a boolean (true or false)
1 === 1; // = true
2 === 1; // = false

// Inequality is checked by using a ! followed by two equals signs
1 !== 1; // = false
2 !== 1; // = true

// More comparisons
1 < 10; // = true
1 > 10; // = false
2 <= 2; // = true
2 >= 2; // = true

// Strings are concatenated (fancy word for joined together) with +
"Hello " + "world!"; // = "Hello world!"

// ... which works with more than just strings
"1, 2, " + 3; // = "1, 2, 3"

// and are compared with < and >
"a" < "b"; // = true, because a comes before b in the alphabet.

// You can access characters in a string with `charAt`
"This is a string".charAt( 0 );  // = 'T'

// ...or use `substring` to get larger pieces.
"Hello world".substring( 0, 5 ); // = "Hello"

// `length` is a property, so don't use ().
"Hello".length; // = 5

// There's also `null` and `undefined`.
null;      // used to indicate a deliberate non-value
undefined; // used to indicate a value is not currently present (although
// `undefined` is actually a value itself)

// false, null, undefined, NaN, 0 and "" are falsy (a boolean false); everything else is truthy (a boolean true).
// Note that 0 is falsy and "0" is truthy, even though 0 == "0".

///////////////////////////////////
// 2. Variables, Arrays and Objects

/*

"Bind" or "store" values to "variables" with the `const` or `let` keyword.
This lets you save values, and reference them by using a name, rather than having to manually keep track of them all of the time.

Generally, you will use `const` which gives you a constant type.  (You won't be able to make you value a string after you assign it as a number)
If you need to be able to switch the type (number, boolean, string etc.) then use `let` instead of `const`

Name your variables using lowercase letters for the first word, then an Uppercase letter for the beginning of any following words.  No spaces allowed!

Assignment uses a single `=` character.

*/
const someconst = 5; // 5
const someOtherConst = 10; // 10
const sum = someconst + someOtherConst; // 15

// You can re-assign the value of one of your variables by using `=` again.
someconst = 20; // 20
const sum2 = someconst + someOtherConst; // 30

// You can even re-assign a value using it's current value
sum2 = sum2 / 2; // Translation: sum2 is now equal to the result of the right hand side
// sum2 = (30) / 2
// sum2 now equals 15

// Variables declared without being assigned to are set to undefined.
// You should avoid doing this whenever possible.

const someThirdVar; // = undefined

// There's shorthand for performing math operations on variables:
someconst += 5; // equivalent to someconst = someconst + 5; someconst is 10 now
someconst *= 10; // now someconst is 100

// and an even-shorter-hand for adding or subtracting 1
someVar++; // now someconst is 101
someVar--; // back to 100

// Arrays are ordered lists of values, of any type.
// You denote an array by using square brackets []


// VERY IMPORTANT
// We start counting at ZERO, not ONE!!!!!!!!
// [0th, 1st, 2nd, 3rd]

const myArray = [ "Hello", 45, true ];

// Their members can be accessed using the square-brackets subscript syntax.
myArray[ 1 ]; // = 45

// Add/Modify at specific index
myArray[ 3 ] = "Hello";

// Get the length of an array by using the name of the array with a dot, then the command (in this case `length`)
myArray.length; // = 4

// Add and remove element from front or back end of an array
myArray.unshift( 3 ); // Add as the first element
someconst = myArray.shift(); // Remove first element and return it
myArray.push( 3 ); // Add as the last element
someconst = myArray.pop(); // Remove last element and return it

// Get subarray of elements from index 1 (include) to 4 (exclude)
myArray0.slice( 1, 4 ); // = [false,"js",12]

// Remove 4 elements starting from index 2, and insert there strings
// "hi","wr" and "ld"; return removed subarray
myArray0.splice( 2, 4, "hi", "wr", "ld" ); // = ["js",12,56,90]
// myArray0 === [32,false,"hi","wr","ld"]

// Sometimes we want to reference a value based on a keyword, instaed of it's position in a list.  In this case, we should use an `object` instead of an array.
// Objects are unordered lists of key-value pairs
// You denote an object by using curly braces {}
const myObj = { key1: "Hello", key2: "World" };

// Keys are strings, but quotes aren't required if they're a valid
// JavaScript identifier. Values can be any type.
const myObj = { myKey: "myValue", "my other key": 4 };

// Object attributes can also be accessed using the subscript syntax,
myObj[ "my other key" ]; // = 4

// ... or using the dot syntax, provided the key is a valid identifier.
myObj.myKey; // = "myValue"

// Object values can be changed and new keys added.
myObj.myThirdKey = true;

// If you try to access a value that's not yet set, you'll get undefined.
myObj.myFourthKey; // = undefined

///////////////////////////////////
// 3. Logic and Control Structures

// If you want to only do something when a case is fulfilled, use if - else if (optional) - else (also optional)
// The thing you want to check goes in (), and what you want to happen if it is true goes in {}
const count = 1;
if ( count == 3 ) {
	// evaluated if (count === 3) is true
	// if (count === 3) was false, then proceed to the next "else if"
} else if ( count == 4 ) {
	// Checked only if (count === 3) was `false`
	// evaluated if count is 4
} else if ( count === "string" )
	// only evaluated if the neither of the first two evaluated to `true`
	// etc.
} else {
	// evaluated if none of the conditions were true.  This is like the backup for if none of the conditions were satisfied.
}

// Loops
// If you want to repeat some instructions a certain number of times, use a `for` loop
// All seperated by commas
//
// for (const name = starting value; keep repeating while this is true; what to do after every loop){
// 		stuff to repeat goes inside {}
// }

// Example:

// initialization; continue condition; iteration.
for ( const i = 0; i < 5; i = i + 1 ) {
	// will run 5 times

	/**** CODE YOU WANT TO EXECUTE GOES HERE ****/

	// 1st time through: i = 0
	// i is still less than 5, so we do the instructions.  After the instructions are over, i is incremented by one because of the i = i + 1

	// 2nd time through: i = 1
	// i is still less than 5, so we do the instructions.  After the instructions are over, i is incremented by one because of the i = i + 1

	// 3rd time through: i = 2
	// i is still less than 5, so we do the instructions.  After the instructions are over, i is incremented by one because of the i = i + 1

	// 4th time through: i = 3
	// i is still less than 5, so we do the instructions.  After the instructions are over, i is incremented by one because of the i = i + 1

	// 5th time through: i = 4
	// i is still less than 5, so we do the instructions.  After the instructions are over, i is incremented by one because of the i = i + 1

	// 6th time through: i = 5.  We are only supposed to do the instructions when i < 5, so we stop looping and continue past the {}
}

// && is logical and, || is logical or
if ( house.size == "big" && house.colour == "blue" ) {
	house.contains = "bear";
}
if ( colour == "red" || colour == "blue" ) {
	// colour is either red or blue
}

///////////////////////////////////
// 4. Functions, Scope and Closures

/*

To make reuseable chunks of code, create a function!

Functions work like in math. They take in some value(s), do some operations, then return some new values.

To create a function, use either:

// FUNCTION KEYWORD SYNTAX (Old-school way)

"function" keyword, followed by the name of the function, (inputs), then {}

or (Much more popular these days)

// ARROW SYNTAX (all the cool kids use arrow syntax)

(any inputs) => {
	instructions to reuse
	return OUTPUT(S)
}

(inputs) a.k.a. (paramaters) can be left blank if you don't need anything special from the rest of the program.

To send back a value that can be assigned to a variable, use the "return" keyword.
const FUNCTION_NAME = (INPUT/S) => {
	STUFF TO DO

	return OUTPUT(S)
}

// Be careful, because the fuction is cut short as soon as the "return" keyword is used.  Nothing after that will be executed! (see example below)

function myFunction () {
	return // <- Anything after the line return is on will never be executed, because return ends the function
	{ thisIsAn: 'object literal' };
}
myFunction(); // = undefined

To use a function, write it's name followed by (), with any inputs inside the ()

If you don't put the (), then it will just be equal to the actual function definition itself.

*/

// Examples

//    name           = (input) => {return output}
const double = ( number1 ) => {
	return number1 * 2
}

const doubledNumber1 = double( 5 ); // doubledNumber1 === 10
const doubledNumber2 = double( 100 ); // doubledNumber2 === 200
const doubledNumber3 = double( 9.8 ); // doubledNumber3 === 19.6

const triple = ( number1 ) => {
	return number1 + number1 + number1
}

triple( 30 ); // 90

const whisper = ( wordToWhisper ) => {
	return wordToYell.toLowerCase();
}

const yell = ( wordToYell ) => {
	return wordToYell.toUpperCase();
}

const words = "Joe";

whisper( words ); // "joe"
whisper( "Joe WHO?" ); // "joe who?"
yell( words + " MAMA!" ); // = "JOE MAMA!"

function congratulate () {
	const newWords = "Nice one"
	const newWords2 = " dude."
	return newWords + newWords2
}

const response = gottem(); // response === "Nice one dude."


// One really useful function built-in to Javascript is called
// console.log()
//
// Whatever inputs you pass it will get displayed in what is called the "console", or an output.  You see the console. hit F12 in your broswer, and go to the console.  All of your messages and values will be displayed there, but not on the normal screen!  It's useful for checking what the value of a variable is at any given time.
// to check, simply pass the variable name as an input, and it's value will be output

console.log( "This message is displayed in the console" ); // Displays "This message si displayed in the console"
console.log( 12 ); // Displays 12
console.log( words ); // Displays "Joe"
console.log( yell( words ) ); // Displays "JOE"

const numbers = [ 20, 21, 22.5 ];
const doubleSecondValueAndLog = ( numbers ) => {
	console.log( numbers[ 1 ] * 2 );// Displays 42
}


// You can actually use functions as input to other functions if you want!

const quadrupled = double( double( 2 ) ); // quadrupled === 8
const octupled = double( double( double( 5 ) ) ); // double(5) === 10; double(10) === 20; double(20) === 40;

// Functions are often like Vegas.  What happens in a function, stays in a function (if it is defined there, at least.)
// Basically, be really, REALLY careful when re-using variable names anywhere.  It might not behave the way you expect!
let i = 10; // i === 0

const doesIChange = () => {
	let i = 2; // i === 2
}
doesIChange();

console.log( i ); // 10


// But if the variable is simply referenced INSIDE the function?

const checkIfIIsEven = () => {
	i = i % 2;
}
checkIfIIsEven()
console.log( i ); // 0

