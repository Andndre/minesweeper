let boardSize;
var board;
let w;
let trapChance; // percent
let trapCount; // note: this is not the final trap count
var revealed; // keep track of revealed count
let boardWidth;

function setting(bs, tc) {
	if (!bs) {
		bs = 10;
	}
	if (!tc) {
		tc = 10;
	}
	boardSize = bs;
	boardWidth = windowWidth > windowHeight ? windowHeight : windowWidth;
	console.log(boardSize);
	board = new Array(boardSize);
	trapChance = tc;
	trapCount = 0;
	revealed = 0;
	w = width / boardSize;
	for (let i = 0; i < boardSize; i++) {
		board[i] = new Array(boardSize);
		for (let j = 0; j < boardSize; j++) {
			let isTrap = random(1) < trapChance / 100;
			if (isTrap) {
				trapCount++;
			}
			board[i][j] = new Cell(i, j, w, isTrap);
			board[i][j].revealed = false;
		}
	}

	for (let row of board) {
		for (let cell of row) {
			if (!cell.trap) {
				cell.countTraps();
			}
		}
	}
	changeTextById("game_status", ".");
	changeTextById("remaining", getRemaining() + " remaining..");
}

function setup() {
	boardWidth = windowWidth > windowHeight ? windowHeight : windowWidth;
	createCanvas(boardWidth - boardWidth * 0.2, boardWidth - boardWidth * 0.2);
	setting(10, 10);
	let bsInput = document.getElementById("board_size");
	let tcInput = document.getElementById("trap_chance");

	document.getElementById("reload").onclick = () => {
		if (bsInput.value < 3) {
			bsInput.value = 3;
		}
		if (tcInput.value == 0) {
			tcInput.value = 0;
		}
		setting(bsInput.value, tcInput.value);
		redraw();
	};
	noLoop();
}

function getRemaining() {
	return boardSize * boardSize - trapCount - revealed;
}

function changeTextById(id, text) {
	document.getElementById(id).innerHTML = text;
}

function gameOver() {
	revealAll();
	changeTextById("game_status", "You lose!");
}

function revealAll() {
	for (let row of board) {
		for (let cell of row) {
			cell.reveal(true);
		}
	}
	redraw();
}

function win() {
	revealAll();
	changeTextById("game_status", "You win!");
}

function mouseClicked() {
	if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return;
	let cell = board[floor(mouseY / w)][floor(mouseX / w)];
	if (!cell.revealed) {
		cell.reveal();
		if (!cell.trap) {
			revealed++;
			changeTextById("remaining", getRemaining() + " remaining..");
		}
		if (revealed == boardSize * boardSize - trapCount) {
			win();
		}
	}
	redraw();
}

function draw() {
	background(100);
	for (let row of board) {
		for (let cell of row) {
			cell.show();
		}
	}
}
