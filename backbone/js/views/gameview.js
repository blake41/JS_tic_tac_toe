var GameView = Backbone.View.extend({
	el: "#game",

	events: {
		"click" : "handleClick"
	},

	initialize : function() {
		this.game = new Game;
		this.game.on("X", this.drawX, this);
		this.game.on("O", this.drawO, this);
		this.game.on("tie", this.tie, this);
		this.game.on("win", this.win, this);
	},

	handleClick : function(e) {
		var id = Number(e.target.id);
		this.game.move(id);
	},

	drawX : function(id) {
		this.$("#" + id).html("X");
	},

	drawO : function(id) {
		this.$("#" + id).html("O");
	},

	tie : function() {
		alert("You Tied!");
		this.clearBoard();
	},

	win : function() {
		alert("You Won");
		this.clearBoard();
	},

	clearBoard : function() {
		$("td").html("");
	}
})

var gameView = new GameView