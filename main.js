/**
 * Othello
 * Javascript project for CIS 343.
 * Command-line version of Othello.
 * Author(s): Josh Weinmann, Daniel Shamburger
 */

// Import our board definitions
const board = require('./board.js');
// Import a synchronous prompt library
const prompt = require('prompt-sync')();

/**
 * saveFile
 * SYNCHRONOUS (blocking) file save function.
 * @param file - The full filename path we want to save to.
 * @param contents - The object we wish to save as a JSON file.
 */
function saveFile(file, contents){
	let fs = require('fs');
	fs.writeFileSync(file, JSON.stringify(contents));
}

/**
 * loadFile
 * SYNCHRONOUS (blocking) file read function.
 * @param file - The full filename path we wish to load an object from.
 * @return contents - The object converted from JSON.
 */
function loadFile(file){
	var fs = JSON.parse(file);
	console.log(fs)
}

/**
 * Driver function.  "main" method, if you will.
 */
function start(){
 	// Local variables SYNCHRONOUSLY read from keyboard
	let height = prompt('What height for your board? ');
	let width = prompt('What width for your board? ');
	
	let turn = 'b';

	console.log('Creating a board with size ' + height + ' x ' + width + '.');
	// Create new board object
	let myBoard = new board(height, width);

	// Print board
	myBoard.printBoard();

	console.log(myBoard.isGameOver());

	// Loop, asking user input, calling appropriate functions.
	while(!myBoard.isGameOver()) {


		let userInput = prompt(`it\'s ${turn}\'s turn: `);

		console.log(userInput);
		if ( userInput == 'q' ) {
			break;
		}

		turn = turn == 'b' ? 'w' : 'b';

	}

	// Save board example code.
	saveFile("test.json", myBoard);
}

console.clear();
start();
