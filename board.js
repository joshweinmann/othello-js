/**
 * board.js
 * Defines a board "class" for an Othello game.
 */

const BLACK = 'b';
const WHITE = 'w';
const EMPTY = '-';

module.exports = class board {
	/**
	 * Construct the object with required state
	 */
	constructor(height, width){
		this.height = height;
		this.width = width;
		this.board = [];
		for(let i=0; i<this.height; ++i){
			let tmp = [];
			for(let j=0; j<this.width; ++j){
				tmp.push(EMPTY);
			}
			this.board.push(tmp);
		}

		// starting pieces 
		this.board[height/2-1][width/2-1] = BLACK;
		this.board[height/2][width/2] = BLACK;
		this.board[height/2-1][height/2] = WHITE;
		this.board[height/2][height/2-1] = WHITE;
	}

	/**
	 * Print a representation of the this.board to the terminal.
	 */
	printBoard(){
		process.stdout.write("\t");
		for(let k=0; k<this.width; ++k) {
			process.stdout.write((k+1) + "\t");
		}
		console.log();
		for(let i=0; i<this.height; ++i){
			process.stdout.write(i+1 + "\t");
			for(let j=0; j<this.width; ++j){
				if(this.board[i][j] == EMPTY){
					process.stdout.write('- \t');
				} else {
					process.stdout.write(this.board[i][j] + "\t");
				}
			}
			console.log();
		}
	}

	/**
	 * isValidMove
	 * @param row An integer row number.
	 * @param col An integer column number.
	 * @param disc A character for the disc color.
	 * @return A boolean indicating whether the move is valid.
	 */
	isValidMove(row, col, disc) {
		return true;
	}

	/**
	 * placeDiscAt
	 * @param row An integer number for row.
	 * @param col An integer number for column.
	 * @param disc A character standing for disc color.
	 */
	placeDiskAt(row, col, disc){

		// place disc
		this.board[row][col] = disc;

		//FIXME: this is very lazy
		var SIZE = this.height;

		var right;

		// check for rightmost disc
		for (let i = col; i < SIZE; ++i) {
			if (this.board[row][i] == disc) {
				right = i;
			}
		}

		var left; 

		// check for leftmost disc
        for (let i = col; i >= 0; --i) {
            if (this.board[row][i] == disc) {
                left = i;
            }
        }

		var top;

		// check for topmost disc
		for (let i = row; i >= 0; --i) {
			if (this.board[i][col] == disc) {
				top = i;
			}
		}

		var bottom;

		// check for bottommost disc
		for (let i = row; i < SIZE; ++i) {
			if (this.board[i][col] == disc) {
				bottom = i;
			}
		}

		// top right
		var topRightRow;
		var topRightCol;

		var i = row;
		var j = col;

		// check for top-rightmost diagonal disc
		while (i >= 0 && j < SIZE) {
			if (this.board[i][j] == disc) {
				topRightRow = i;
				topRightCol = j;
	                }
			--i;
			++j;
		}

		// top left
		var topLeftRow;
		var topLeftCol;

		i = row;
		j = col;

		// check for top-leftmost diagonal disc
		while (i >= 0 && j >= 0) {
            if (this.board[i][j] == disc) {
                topLeftRow = i;
                topLeftCol = j;
            }
            --i;
            --j;
        }

		// bottom right
		var bottomRightRow;
		var bottomRightCol;

		i = row;
		j = col;

		// check for bottom-rightmost diagonal disc
		while (i < SIZE && j < SIZE) {
            if (this.board[i][j] == disc) {
                bottomRightRow = i;
                bottomRightCol = j;
            }
            ++i;
            ++j;
        }

		// bottom left
		var bottomLeftRow;
		var bottomLeftCol;

		i = row;
		j = col;

		// check for bottom-leftmost diagonal disc
		while (i < SIZE && j >= 0) {
            if (this.board[i][j] == disc) {
                bottomLeftRow = i;
                bottomLeftCol = j;
            }
            ++i;
            --j;
        }
		
		// change discs to right
		if (right > col) {
			for (let i = right-1; i > col; --i) {
				if (this.board[row][i] == BLACK || this.board[row][i] == WHITE) {
					this.board[row][i] = disc;
				}
			}
		}

		// change discs to left
		if (left < col) {
			for (let i = left+1; i < col; ++i) {
				if (this.board[row][i] == BLACK || this.board[row][i] == WHITE) {
					this.board[row][i] = disc;
				}
			}
		}

		// change discs to top
		if (top < row) {
			for (let i = top+1; i < row; ++i) {
                if (this.board[i][col] == BLACK || this.board[i][col] == WHITE) {
                    this.board[i][col] = disc;
                }
            }
		}

		// change discs to bottom
		if (bottom > row) {
			for (let i = bottom-1; i > row; --i) {
                if (this.board[i][col] == BLACK || this.board[i][col] == WHITE) {
                    this.board[i][col] = disc;
                }
            }
		}

		// change discs to top-right
		if (topRightRow < row && topRightCol > col) {
			var i = topRightRow+1;
			var j = topRightCol-1;
			while (i < row && j > col) {
				if (this.board[i][j] == BLACK || this.board[i][j] == WHITE) {
					this.board[i][j] = disc;
				}
				++i;
				--j;
			}
		}

		// change discs to top-left
		if (topLeftRow < row && topLeftCol < col) {
            var i = topLeftRow+1;
            var j = topLeftCol+1;
            while (i < row && j < col) {
                if (this.board[i][j] == BLACK || this.board[i][j] == WHITE) {
                        this.board[i][j] = disc;
                }
                ++i;
                ++j;
            }
        }

		// change discs to bottom-right
		if (bottomRightRow > row && bottomRightCol > col) {
            var i = bottomRightRow-1;
            var j = bottomRightCol-1;
            while (i > row && j > col) {
                if (this.board[i][j] == BLACK || this.board[i][j] == WHITE) {
                        this.board[i][j] = disc;
                }
                --i;
                --j;
            }
        }

		// change discs to bottom-left
		if (bottomLeftRow > row && bottomLeftCol < col) {
            var i = bottomLeftRow-1;
            var j = bottomLeftCol+1;
            while (i > row && j < col) {
                if (this.board[i][j] == BLACK || this.board[i][j] == WHITE) {
                        this.board[i][j] = disc;
                }
                --i;
                ++j;
            }
	    }
	}

	/**
	 * isValidMoveAvailable
	 * @param disc A character pertaining to a disc color.
	 * @return bool A boolean telling the user whether there are
	 *	 	valid moves availabe for that disc.
	 */
	isValidMoveAvailable(disc){

		// check all spaces
		for(let i=0; i<this.height; ++i){
			for(let j=0; j<this.width; ++j){
				// check if move is valid in space
				if (this.isValidMove(i, j, disc)) 
					return true;
			}
		}

		// no valid moves
		return false;
	}

	/**
	 * isBoardFull
	 * @return boolean Whether or not the this.board is full.
	 */
	isBoardFull(){

		// check all spots for openings
		for(let i=0; i<this.height; ++i){
			for(let j=0; j<this.width; ++j){

				// check for open spots
				if (this.board[i][j] == EMPTY) {
					return false;
				}
			}
		}
		return true;
	}

	/**
	 * isGameOver
	 * @return bool Whether or not the game is over.
	 */
	isGameOver(){

		// check if this.board is full
		if (this.isBoardFull()) {
			return true;
		}

		// check if valid move is available for black
		else if (!this.isValidMoveAvailable(BLACK)) {
			return true;
		}

		// check if valid move is available white
	    else if (!this.isValidMoveAvailable(WHITE)) {
			return true;
	    }

		// game is not over
		return false;
	}

	/**
	 * checkWinner
	 * @return char Which player has won.  Return null if
	 * 		a tie exists.
	 */
	checkWinner(){

		// keep track of disc counts
		var w = 0;
		var b = 0;

		// count player discs
		for(let i=0; i<this.height; ++i){
			for(let j=0; j<this.width; ++j){

				// check for black discs
	        	if (this.board[i][j] == BLACK) 
	        		b++;

				// check for white discs
				if (this.board[i][j] == WHITE) 
            			w++;
			}
		}

		// more white discs
		if (w > b) {
			return WHITE;
		}

		// more black discs
		else if (b > w) {
			return BLACK;
		}

		// tie
		else {
			return null;
		}
	}
}

//let this.board = new this.board(10, 10);
//board.printBoard();
