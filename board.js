/**
 * this.board
 * Defines a this.board "class" for an Othello game.
 */

var BLACK = 'b';
var WHITE = 'w';
var EMPTY = '-';

module.exports = class this.board {
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
				tmp.push(-1);
			}
			this.board.push(tmp);
		}
	}

	/**
	 * Print a representation of the this.board to the terminal.
	 */
	printBoard(){
		for(let i=0; i<this.height; ++i){
			for(let j=0; j<this.width; ++j){
				if(this.board[i][j] == -1){
					process.stdout.write('.\t')
				} else {
					process.stdout.write(this.board[i][j] + "\t")
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
	isValid(row, col, disc){

		var row_runner = row;
		var col_runner = col;

		//FIXME: this is very lazy
		var SIZE = this.height;

		// space must be empty
		if (this.board[row][col] != EMPTY) {
			return false;
		}

		// top left 
		if ( row == 0 && col == 0 ) {
			// check east for other player
			if (this.board[row][col+1] != disc && this.board[row][col+1] != EMPTY) {
				// run east
		 		for ( col_runner = col+2; col_runner < SIZE; col_runner++) {
		 			if ( this.board[row][col_runner] == disc ) 
		 				return true;
		 		}
			}
			// check south east for other player
			if (this.board[row+1][col+1] != disc && this.board[row+1][col+1] != EMPTY) {
				// run south east
				for ( row_runner = row+2, col_runner = col+2; row_runner < SIZE && col_runner < SIZE; row_runner++, col_runner++) {
			 		if ( this.board[row_runner][col_runner] == disc ) 
			 			return true;
			 	}
			}
			// check south for other player
			if (this.board[row+1][col] != disc && this.board[row+1][col] != EMPTY) {
				// run south
			 	for ( row_runner = row+2; row_runner < SIZE; row_runner++) {
			 		if ( this.board[row_runner][col] == disc ) 
			 			return true;
			 	}
			}	
		}

		// top right
		if ( row == 0 && col == (SIZE - 1) ) {
			// check west for other player
			if (this.board[row][col-1] != disc && this.board[row][col-1] != EMPTY) {
				// run west
			 	for ( col_runner = col-2; col_runner > 0; col_runner--) {
			 		if ( this.board[row][col_runner] == disc ) 
			 			return true;
			 	}
			}
			// check south for other player
			if (this.board[row+1][col] != disc && this.board[row+1][col] != EMPTY) {
				// run south
			 	for ( row_runner = row+2; row_runner < SIZE; row_runner++) {
			 		if ( this.board[row_runner][col] == disc ) 
			 			return true;
			 	}
			}
			// check south west for other player
			if (this.board[row+1][col-1] != disc && this.board[row+1][col-1] != EMPTY) {
				// run south west
				for ( row_runner = row+2, col_runner = col-2; row_runner < SIZE && col_runner > 0; row_runner++, col_runner--) {
			 		if ( this.board[row_runner][col_runner] == disc ) 
			 			return true;
			 	}
			}
		}

		// bottom left
		if ( row == (SIZE - 1) && col == 0 ) {
			// check north for other player
			if (this.board[row-1][col] != disc && this.board[row-1][col] != EMPTY) {
				// run north
			 	for ( row_runner = row-2; row_runner > 0; row_runner--) {
			 		if ( this.board[row_runner][col] == disc ) 
			 			return true;
			 	}
			}
			// check east for other player
			if (this.board[row][col+1] != disc && this.board[row][col+1] != EMPTY) {
				// run east
			 	for ( col_runner = col+2; col_runner < SIZE; col_runner++) {
			 		if ( this.board[row][col_runner] == disc ) 
			 			return true;
			 	}
			}
			// check north east for other player
			if (this.board[row-1][col+1] != disc && this.board[row-1][col+1] != EMPTY) {
				// run northeast
				for ( row_runner = row-2, col_runner = col+2; row_runner > 0 && col_runner < SIZE; row_runner--, col_runner++) {
			 		if ( this.board[row_runner][col_runner] == disc ) 
			 			return true;
			 	}
			}
		}

		// bottom right 
		if ( row == (SIZE - 1) && col == (SIZE - 1) ) {
			// check west for other player
			if (this.board[row][col-1] != disc && this.board[row][col-1] != EMPTY) {
				// run west
			 	for ( col_runner = col-2; col_runner > 0; col_runner--) {
			 		if ( this.board[row][col_runner] == disc ) 
			 			return true;
			 	}
			}
			// check north for other player
			if (this.board[row-1][col] != disc && this.board[row-1][col] != EMPTY) {
				// run north
			 	for ( row_runner = row-2; row_runner > 0; row_runner--) {
			 		if ( this.board[row_runner][col] == disc ) 
			 			return true;
			 	}
			}
			// check north west for other player
			if (this.board[row-1][col-1] != disc && this.board[row-1][col-1] != EMPTY) {
				// run north west
				for ( row_runner = row-2, col_runner = col-2; row_runner > 0 && col_runner > 0; row_runner--, col_runner--) {
			 		if ( this.board[row_runner][col_runner] == disc ) 
			 			return true;
			 	}
			}
		}

		// top
		if ( row == 0 ) {
			// check west for other player
			if (this.board[row][col-1] != disc && this.board[row][col-1] != EMPTY) {
				// run west
			 	for ( col_runner = col-2; col_runner > 0; col_runner--) {
			 		if ( this.board[row][col_runner] == disc ) 
			 			return true;
			 	}
			}
			
			// check south west for other player
			if (this.board[row+1][col-1] != disc && this.board[row+1][col-1] != EMPTY) {
				// run south west
				for ( row_runner = row+2, col_runner = col-2; row_runner < SIZE && col_runner > 0; row_runner++, col_runner--) {
			 		if ( this.board[row_runner][col_runner] == disc ) 
			 			return true;
			 	}
			}

			// check south for other player
			if (this.board[row+1][col] != disc && this.board[row+1][col] != EMPTY) {
				// run south
			 	for ( row_runner = row+2; row_runner < SIZE; row_runner++) {
			 		if ( this.board[row_runner][col] == disc ) 
			 			return true;
			 	}
			}

			// check south east for other player
			if (this.board[row+1][col+1] != disc && this.board[row+1][col+1] != EMPTY) {
				// run south east
				for ( row_runner = row+2, col_runner = col+2; row_runner < SIZE && col_runner < SIZE; row_runner++, col_runner++) {
			 		if ( this.board[row_runner][col_runner] == disc ) 
			 			return true;
			 	}
			}

			// check east for other player
			if (this.board[row][col+1] != disc && this.board[row][col+1] != EMPTY) {
				// run east
			 	for ( col_runner = col+2; col_runner < SIZE; col_runner++) {
			 		if ( this.board[row][col_runner] == disc ) 
			 			return true;
			 	}
			}
		}

		// right
		if ( col == (SIZE - 1) ) {
			// check north for other player
			if (this.board[row-1][col] != disc && this.board[row-1][col] != EMPTY) {
				// run north
			 	for ( row_runner = row-2; row_runner > 0; row_runner--) {
			 		if ( this.board[row_runner][col] == disc ) 
			 			return true;
			 	}
			}

			// check north west for other player
			if (this.board[row-1][col-1] != disc && this.board[row-1][col-1] != EMPTY) {
				// run north west
				for ( row_runner = row-2, col_runner = col-2; row_runner > 0 && col_runner > 0; row_runner--, col_runner--) {
			 		if ( this.board[row_runner][col_runner] == disc ) 
			 			return true;
			 	}
			}

			// check west for other player
			if (this.board[row][col-1] != disc && this.board[row][col-1] != EMPTY) {
				// run west
			 	for ( col_runner = col-2; col_runner > 0; col_runner--) {
			 		if ( this.board[row][col_runner] == disc ) 
			 			return true;
			 	}
			}

			// check south west for other player
			if (this.board[row+1][col-1] != disc && this.board[row+1][col-1] != EMPTY) {
				// run south west
				for ( row_runner = row+2, col_runner = col-2; row_runner < SIZE && col_runner > 0; row_runner++, col_runner--) {
			 		if ( this.board[row_runner][col_runner] == disc ) 
			 			return true;
			 	}
			}

			// check south for other player
			if (this.board[row+1][col] != disc && this.board[row+1][col] != EMPTY) {
				// run south
			 	for ( row_runner = row+2; row_runner < SIZE; row_runner++) {
			 		if ( this.board[row_runner][col] == disc ) 
			 			return true;
			 	}
			}
		}

		// bottom 
		if ( row == (SIZE - 1) ) {
			// check west for other player
			if (this.board[row][col-1] != disc && this.board[row][col-1] != EMPTY) {
				// run west
			 	for ( col_runner = col-2; col_runner > 0; col_runner--) {
			 		if ( this.board[row][col_runner] == disc ) 
			 			return true;
			 	}
			}

			// check north west for other player
			if (this.board[row-1][col-1] != disc && this.board[row-1][col-1] != EMPTY) {
				// run north west
				for ( row_runner = row-2, col_runner = col-2; row_runner > 0 && col_runner > 0; row_runner--, col_runner--) {
			 		if ( this.board[row_runner][col_runner] == disc ) 
			 			return true;
			 	}
			}

			// check north for other player
			if (this.board[row-1][col] != disc && this.board[row-1][col] != EMPTY) {
				// run north
			 	for ( row_runner = row-2; row_runner > 0; row_runner--) {
			 		if ( this.board[row_runner][col] == disc ) 
			 			return true;
			 	}
			}

			// check north east for other player
			if (this.board[row-1][col+1] != disc && this.board[row-1][col+1] != EMPTY) {
				// run northeast
				for ( row_runner = row-2, col_runner = col+2; row_runner > 0 && col_runner < SIZE; row_runner--, col_runner++) {
			 		if ( this.board[row_runner][col_runner] == disc ) 
			 			return true;
			 	}
			}

			// check east for other player
			if (this.board[row][col+1] != disc && this.board[row][col+1] != EMPTY) {
				// run east
			 	for ( col_runner = col+2; col_runner < SIZE; col_runner++) {
			 		if ( this.board[row][col_runner] == disc ) 
			 			return true;
			 	}
			}
		}
	

		// left 
		if ( col == 0 ) {
			// check north for other player
			if (this.board[row-1][col] != disc && this.board[row-1][col] != EMPTY) {
				// run north
			 	for ( row_runner = row-2; row_runner > 0; row_runner--) {
			 		if ( this.board[row_runner][col] == disc ) 
			 			return true;
			 	}
			}

			// check north east for other player
			if (this.board[row-1][col+1] != disc && this.board[row-1][col+1] != EMPTY) {
				// run northeast
				for ( row_runner = row-2, col_runner = col+2; row_runner > 0 && col_runner < SIZE; row_runner--, col_runner++) {
			 		if ( this.board[row_runner][col_runner] == disc ) 
			 			return true;
			 	}
			}

			// check east for other player
			if (this.board[row][col+1] != disc && this.board[row][col+1] != EMPTY) {
				// run east
			 	for ( col_runner = col+2; col_runner < SIZE; col_runner++) {
			 		if ( this.board[row][col_runner] == disc ) 
			 			return true;
			 	}
			}

			// check south east for other player
			if (this.board[row+1][col+1] != disc && this.board[row+1][col+1] != EMPTY) {
				// run south east
				for ( row_runner = row+2, col_runner = col+2; row_runner < SIZE && col_runner < SIZE; row_runner++, col_runner++) {
			 		if ( this.board[row_runner][col_runner] == disc ) 
			 			return true;
			 	}
			}

			// check south for other player
			if (this.board[row+1][col] != disc && this.board[row+1][col] != EMPTY) {
				// run south
			 	for ( row_runner = row+2; row_runner < SIZE; row_runner++) {
			 		if ( this.board[row_runner][col] == disc ) 
			 			return true;
			 	}
			}
		}

		// middle of the this.board
		if ( row < (SIZE - 1) && col < (SIZE - 1) && row != 0 && col != 0 ) {

			// check north for other player
			if (this.board[row-1][col] != disc && this.board[row-1][col] != EMPTY) {
				// run north
			 	for ( row_runner = row-2; row_runner > 0; row_runner--) {
			 		if ( this.board[row_runner][col] == disc ) 
			 			return true;
			 	}
			}

			// check north east for other player
			if (this.board[row-1][col+1] != disc && this.board[row-1][col+1] != EMPTY) {
				// run northeast
				for ( row_runner = row-2, col_runner = col+2; row_runner > 0 && col_runner < SIZE; row_runner--, col_runner++) {
			 		if ( this.board[row_runner][col_runner] == disc ) 
			 			return true;
			 	}
			}

			// check east for other player
			if (this.board[row][col+1] != disc && this.board[row][col+1] != EMPTY) {
				// run east
			 	for ( col_runner = col+2; col_runner < SIZE; col_runner++) {
			 		if ( this.board[row][col_runner] == disc ) 
			 			return true;
			 	}
			}

			// check south east for other player
			if (this.board[row+1][col+1] != disc && this.board[row+1][col+1] != EMPTY) {
				// run south east
				for ( row_runner = row+2, col_runner = col+2; row_runner < SIZE && col_runner < SIZE; row_runner++, col_runner++) {
			 		if ( this.board[row_runner][col_runner] == disc ) 
			 			return true;
			 	}
			}

			// check south for other player
			if (this.board[row+1][col] != disc && this.board[row+1][col] != EMPTY) {
				// run south
			 	for ( row_runner = row+2; row_runner < SIZE; row_runner++) {
			 		if ( this.board[row_runner][col] == disc ) 
			 			return true;
			 	}
			}

			// check south west for other player
			if (this.board[row+1][col-1] != disc && this.board[row+1][col-1] != EMPTY) {
				// run south west
				for ( row_runner = row+2, col_runner = col-2; row_runner < SIZE && col_runner > 0; row_runner++, col_runner--) {
			 		if ( this.board[row_runner][col_runner] == disc ) 
			 			return true;
			 	}
			}

			// check west for other player
			if (this.board[row][col-1] != disc && this.board[row][col-1] != EMPTY) {
				// run west
			 	for ( col_runner = col-2; col_runner > 0; col_runner--) {
			 		if ( this.board[row][col_runner] == disc ) 
			 			return true;
			 	}
			}

			// check north west for other player
			if (this.board[row-1][col-1] != disc && this.board[row-1][col-1] != EMPTY) {
				// run north west
				for ( row_runner = row-2, col_runner = col-2; row_runner > 0 && col_runner > 0; row_runner--, col_runner--) {
			 		if ( this.board[row_runner][col_runner] == disc ) 
			 			return true;
			 	}
			}
		}

		// if it didn't fit any of those cases, it's not a valid move
		return false;
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
				if (isValidMove(i, j, disc)) 
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
		if (isBoardFull()) {
			return true;
		}

		// check if valid move is available for black
		else if (!isValidMoveAvailable(BLACK)) {
			return true;
		}

		// check if valid move is available white
	    else if (!isValidMoveAvailable(WHITE)) {
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
