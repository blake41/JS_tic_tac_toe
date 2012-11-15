var Game = (function() {
	var turn = 0;
	var board = [null, null, null,
					null, null, null, 
					null, null, null];
	var winningCombos = [[0,1,2], [3,4,5], [6,7,8],
						 [0,3,6], [1,4,7], [2,5,8], 
						 [0,4,8], [2,4,6]];
	var props = {}
	props.isFilled = function(id) {
		return board[id];
	}
	props.getTurn = function() {
		return turn;
	}
	props.incTurn = function() {
		turn++
	}
	props.getBoard = function() {
		return board;
	}
	props.moveX = function(id) {
		if(this.isFilled(id)) {
			return false;
		}
		else {
			board[id] = "X";
		}
		return true;
	}
	props.moveO = function(id) {
		if(this.isFilled(id)) {
			return false;
		}
		else {
			board[id] = "O";
		}
		return true;
	}
	props.tie = function() {
		for(var i = 0; i < board.length; i++) {
			if(!this.isFilled(i)) {
				return false;
			}
		}
		return true;
	}
	props.gameOver = function() {
		for(var i = 0; i < winningCombos.length; i++) {
			if(this.checkCells(winningCombos[i]) == true) {
				return "win";
			}
		}
		if(this.tie()) {
			return "tie";
		}
	}
	props.player = function() {
		if(turn % 2 == 0) {
			return "X";
		}
		else {
			return "O";
		}
	}
	props.checkCells = function(combo) {
		for(var i = 0; i < combo.length; i++) {
			if(board[combo[i]] != this.player()) {
				return false;
			}
		}
		return true;
	}
	// take an int and return a boolean, were we able to move
	// events: "X" | "O" | "win" | "tie"
	props.move = function(id) {
		if(this.getTurn() % 2 == 0) {
			if(this.moveX(id)) {
				this.trigger("X", id);
				var state = this.gameOver();
				if(state == "win") {
					this.trigger("win");
				}
				else if(state == "tie") {
					this.trigger("tie");
				}
				this.incTurn();
				return true;
			}
		}	
		else {
			if(this.moveO(id)) {
				this.trigger("O", id);
				var state = this.gameOver();
				if(state == "win") {
					this.trigger("win");
				}
				else if(state == "tie") {
					this.trigger("tie");
				}
				this.incTurn();
				return true;
			}
		}
		return false;
	}
	return Backbone.Model.extend(props);
})();