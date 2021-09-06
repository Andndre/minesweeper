class Cell {
	constructor(i, j, w, trap) {
		this.w = w;
		this.i = i;
		this.j = j;
		this.x = j * w;
		this.y = i * w;
		this.traps = -1;
		this.revealed = false;
		this.trap = trap;
	}
	show() {
		if (this.revealed && !this.trap) {
			fill(38, 34, 34);
		} else {
			fill(242, 241, 235);
		}

		stroke(0);
		rect(this.x, this.y, this.x + this.w, this.y + this.w);
		if (this.revealed) {
			if (this.trap) {
				fill(222, 64, 47);
				circle(
					this.x + this.w * 0.5,
					this.y + this.w * 0.5,
					this.w * 0.5
				);
			} else {
				// textAlign(CENTER);
				fill(255);
				textSize(this.w * 0.5);
				text(this.traps, this.x + this.w * 0.5, this.y + this.w * 0.5);
			}
		}
	}
	floodFill() {
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				let iCurr = this.i + i;
				let jCurr = this.j + j;
				if (iCurr < 0 || iCurr >= board.length) {
					continue;
				}
				if (jCurr < 0 || jCurr >= board[0].length) {
					continue;
				}
				if (!board[iCurr][jCurr].revealed) {
					revealed++;
					// await sleep(1);
					board[iCurr][jCurr].reveal();
				}
			}
		}
	}
	/**
	 *
	 * @param {boolean} noFloodFill disable flood fill
	 */
	reveal(noFloodFill) {
		this.revealed = true;
		if (!noFloodFill) {
			if (this.traps == 0) {
				this.floodFill();
			} else if (this.trap) {
				gameOver();
			}
		}
	}
	countTraps() {
		if (this.trap) {
			return;
		}
		let count = 0;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				let iCurr = this.i + i;
				let jCurr = this.j + j;
				if (iCurr < 0 || iCurr >= board.length) {
					continue;
				}
				if (jCurr < 0 || jCurr >= board[0].length) {
					continue;
				}
				if (board[iCurr][jCurr].trap) {
					count++;
				}
			}
		}
		this.traps = count;
	}
}
