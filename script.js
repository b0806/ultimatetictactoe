const statusDisplay = document.querySelector('.status');

let gameActive = true;
let activeBoard = "0"
let currentPlayer = "X";
let board = [["", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", ""]];
let boardWins = ["", "", "", "", "", "", "", "", ""];

const winConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

function cellClick(clickEvent) {
	if (!gameActive) {
		return;
	}
	
	const clickedCellObj = clickEvent.target;
	
	const clickedBoard = clickedCellObj.parentNode.getAttribute("ttt-board");
	const clickedCell = clickedCellObj.getAttribute("ttt-cell");
	
	console.log(`Board ${clickedBoard} Cell ${clickedCell} clicked`);
	
	if (activeBoard !== "0") {
		if (clickedBoard !== activeBoard) {
			return;
		}
	}
	
	if (board[parseInt(clickedBoard)-1][parseInt(clickedCell)-1] !== "" || boardWins[parseInt(clickedBoard)-1] !== "") {
		return;
	}
	
	board[parseInt(clickedBoard)-1][parseInt(clickedCell)-1] = currentPlayer;
	clickedCellObj.innerHTML = currentPlayer;
	
	if (activeBoard == "0") {
		activeBoard = clickedBoard;
	}
	
	checkWins(clickedCellObj);
	
	if (currentPlayer == "X") {
		currentPlayer = "O";
	} else {
		currentPlayer = "X";
	}
	
	activeBoard = clickedCell;
	
	if (boardWins[parseInt(activeBoard)-1] !== "") {
		activeBoard = "0";
	}
	
	if (gameActive) {
		statusDisplay.innerHTML = currentPlayerTurn();
	}
}

function checkWins(clickObj) {
	let boardWin = false;
	for (let i = 0; i < 8; i++) {
		const winCondition = winConditions[i];
		let a = board[parseInt(activeBoard)-1][winCondition[0]];
		let b = board[parseInt(activeBoard)-1][winCondition[1]];
		let c = board[parseInt(activeBoard)-1][winCondition[2]];
		if (a === '' || b === '' || c === '') {
			continue;
		}
		if (a === b && b === c) {
			boardWin = true;
			break;
		}
	}
	if (boardWin) {
		console.log(`Board ${activeBoard} won by ${currentPlayer}`); 
		
		clickObj.parentNode.querySelectorAll('.cell').forEach(cell => cell.style.visibility = "hidden");
		
		let center = clickObj.parentNode.querySelector('div[ttt-cell="5"]');
		center.style.visibility = "visible";
		center.style.borderColor = "transparent";
		center.style.boxShadow = "none";
		center.style.fontSize = "80px";
		center.innerHTML = currentPlayer;
		
		boardWins[parseInt(activeBoard)-1] = currentPlayer;
		
		let gameWin = false;
		for (let i = 0; i < 8; i++) {
			const winCondition = winConditions[i];
			let a = boardWins[winCondition[0]];
			let b = boardWins[winCondition[1]];
			let c = boardWins[winCondition[2]];
			if (a === '' || b === '' || c === '') {
				continue;
			}
			if (a === 'D' || b === 'D' || c === 'D') {
				continue;
			}
			if (a === b && b === c) {
				gameWin = true;
				break;
			}
		}
		
		if (gameWin) {
			statusDisplay.innerHTML = `Player ${currentPlayer} has won!`;
			gameActive = false;
			return;
		}
		
		let gameDraw = !boardWins.includes("");
		if (gameDraw) {
			statusDisplay.innerHTML = `Game ended in a draw`;
			gameActive = false;
			return;
		}
	}

	let boardDraw = !board[parseInt(activeBoard)-1].includes("");
	if (boardDraw) {
		console.log(`Board ${activeBoard} ended in a draw`); 
		clickObj.innerHTML = "D";
		boardWins[parseInt(activeBoard)-1] = "D";
	}
}

function restartGame() {
	gameActive = true;
	activeBoard = "0"
	currentPlayer = "X";
	board = [["", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", ""]];
	boardWins = ["", "", "", "", "", "", "", "", ""];
	document.querySelectorAll('.cell').forEach((cell) => {
		cell.innerHTML = "";
		cell.style.visibility = "visible";
	});
	document.querySelectorAll('.board').forEach((board) => {
		let centre = board.querySelector('div[ttt-cell="5"]');
		centre.style.visibility = "visible";
		centre.style.borderColor = "#333333";
		centre.style.boxShadow = "0 0 0 1px #333333";
		centre.style.fontSize = "20px";
		centre.innerHTML = "";
	});
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClick));
document.querySelector('.restart').addEventListener('click', restartGame);