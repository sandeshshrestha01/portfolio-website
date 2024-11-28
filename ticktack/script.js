// script.js

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
const startButton = document.getElementById('startButton');
const playerSelection = document.getElementById('player-selection');
const board = document.getElementById('board');

let boardState = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];
let currentPlayer = null; // Current player ('X' or 'O')
let gameStarted = false;

// Function to check for a winner
function checkWinner() {
  // Check rows, columns, and diagonals
  for (let i = 0; i < 3; i++) {
    if (boardState[i][0] === boardState[i][1] && boardState[i][1] === boardState[i][2] && boardState[i][0] !== '') {
      return boardState[i][0];
    }
    if (boardState[0][i] === boardState[1][i] && boardState[1][i] === boardState[2][i] && boardState[0][i] !== '') {
      return boardState[0][i];
    }
  }

  if (boardState[0][0] === boardState[1][1] && boardState[1][1] === boardState[2][2] && boardState[0][0] !== '') {
    return boardState[0][0];
  }

  if (boardState[0][2] === boardState[1][1] && boardState[1][1] === boardState[2][0] && boardState[0][2] !== '') {
    return boardState[0][2];
  }

  // Check for a draw
  if (boardState.every(row => row.every(cell => cell !== ''))) {
    return 'draw';
  }

  return null;
}

// Function to handle cell click
function handleCellClick(event) {
  if (!gameStarted) return;

  const row = event.target.getAttribute('data-row');
  const col = event.target.getAttribute('data-col');

  if (boardState[row][col] !== '') {
    return; // Do nothing if the cell is already filled
  }

  // Update the board and cell text
  boardState[row][col] = currentPlayer;
  event.target.textContent = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    if (winner === 'draw') {
      statusDisplay.textContent = "It's a draw!";
    } else {
      statusDisplay.textContent = `Player ${winner} wins!`;
    }
    disableBoard();
  } else {
    // Switch players
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Disable board after game ends
function disableBoard() {
  cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
}

// Reset the game
function resetGame() {
  boardState = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  cells.forEach(cell => {
    cell.textContent = '';
    cell.addEventListener('click', handleCellClick);
  });
  currentPlayer = 'X'; // Default to 'X' after reset
  gameStarted = false;
  playerSelection.style.display = 'block';
  board.style.display = 'none';
  resetButton.style.display = 'none';
  statusDisplay.textContent = "Please select your marker to start.";
}

function startGame() {
  const selectedPlayer = document.querySelector('input[name="player"]:checked');

  if (!selectedPlayer) {
    statusDisplay.textContent = "Please select X or O to start.";
    return;
  }

  currentPlayer = selectedPlayer.value;
  gameStarted = true;
  playerSelection.style.display = 'none';
  board.style.display = 'grid';
  resetButton.style.display = 'block';
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

// Add event listeners
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);
