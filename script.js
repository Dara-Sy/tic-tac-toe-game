// I used sources from free code camp online to help me make this game

var originalBoard;
const player1 = 'O';
const player2 = 'X';
// player2 is supposed to be the computer
// these are combinations of possible victorys or wins
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
]

const cells = document.querySelectorAll(".cell");
startGame();

function startGame() {
  document.querySelector(".endgame").style.display = "none";
  originalBoard = Array.from(Array(9).keys());
  // this will reference the cells or empty boxes of the board game
  // inner text is blank
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click', turnClick, false);
  }
}

function turnClick(square) {
  if(typeof originalBoard[square.target.id] == 'number') {
    turn(square.target.id, player1)
      if (!checkTie()) turn(counterTurn(), player2);
  }
}

function turn(squareId, player) {
  originalBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
  let gameWon = checkWin(originalBoard, player)
  if (gameWon) gameOver(gameWon)
}

// check win will not need to use original board

function checkWin(board, player) {
  // use reduce method to give back one single value
  // a - accumulator array
  // e - element
  // i - index
  // this adds index to array
  // if e does not equal player, we return the accumulator
  // this finds every index the player played
  let plays = board.reduce((a, e, i) =>
    (e === player) ? a.concat(i) : a, []);
  let gameWon = null;
  // this for of loop which checks if the player won
  // this references the winCombos array
  for (let [index, win] of winCombos.entries()) {
    if (win.every(element => plays.indexOf(element) > -1)) {
      gameWon = {index: index, player: player};
      // break from function once winner is announced
      break;
    }
  }
  // if no one wins, gameWon is null
  return gameWon;
}


function gameOver(gameWon) {
  // references the index of winCombos
  for (let index of winCombos[gameWon.index]) {
    // this will show the winner as green
    // this will show the loser as red
    document.getElementById(index).style.backgroundColor =
      gameWon.player == player1 ? "green" : "red";
  }
  // this prevents player from clicking more squares when game is over
  for (var i = 0; i < cells.length; i++) {
    cells[i].removeEventListener('click', turnClick, false);
  }
// call declare winner function
// if human player wins, win message : (means else) lose message
  declareWinner(gameWon.player == player1 ? "You win!" : "You lose.");
}

function emptySquares() {
  return originalBoard.filter(s => typeof s == 'number')
}

// player2 or "computer" will find the empty squares to make a counter move or turn
function counterTurn() {
  return emptySquares()[0];
}

function declareWinner(who) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = who;
}

function checkTie() {
  if(emptySquares().length == 0) {
    for (var i = 0; i < cell.length; i++) {
      cells[i].style.backgroundColor = "yellow";
      cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner("Tie Game!")
    return true;
  }
  return false;
}

