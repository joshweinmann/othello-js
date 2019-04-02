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

	console.log('Creating a board with size ' + height + ' x ' + width + '...\n');
	// Create new board object
	let myBoard = new board(height, width);

	

	// Loop, asking user input, calling appropriate functions.
	while(!myBoard.isGameOver()) {

		// Print board
		myBoard.printBoard();

		if (!myBoard.isValidMoveAvailable(turn)) {
			printf("No valid moves available for player %d. You lose your turn.\n",turn);
		} else {
			do {
				let userInput = prompt(`It\'s ${turn}\'s turn. Enter [row] [col] to place your disc, or q to quit: `);

				if ( userInput == 'q' || userInput == 'Q' )
					break;
				else if ( userInput.length != 3 || userInput[0] < 0 || userInput[0] > height-1 || userInput[2] < 0 || userInput[2] > width-1 ) {
					continue;
				}
				let row = userInput[0]-1, col = userInput[2]-1;
				if (!myBoard.isValidMove(row,col,turn)) {
					console.log('Sorry, that is not a valid move. Try again.');
					continue;
				}
			} while (true);
			myBoard.placeDiskAt(row, col, turn);
		} 

		turn = turn == 'b' ? 'w' : 'b';
	}

	const winner = myBoard.checkWinner();
	if (winner == BLACK || winner == WHITE) {
		console.log(`Game Over. ${winner} won!`);
	} else {
		console.log('Game Over. Tie!')
	}

	// Save board example code.
	saveFile("test.json", myBoard);
}

console.clear();
start();
