const X_CLASS = 'x';
const O_CLASS = 'o';
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restart');
let oTurn = false;

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

startGame();
restartButton.addEventListener('click', startGame);

function startGame() {
  oTurn = false;
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS, O_CLASS, 'winning');
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setStatusText();
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = oTurn ? O_CLASS : X_CLASS;
  cell.textContent = currentClass.toUpperCase();
  cell.classList.add(currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    oTurn = !oTurn;
    setStatusText();
  }
}

function endGame(draw) {
  if (draw) {
    statusText.textContent = "Draw!";
  } else {
    statusText.textContent = `${oTurn ? "O" : "X"} Wins!`;
    highlightWinningCells(oTurn ? O_CLASS : X_CLASS);
  }
  cellElements.forEach(cell => {
    cell.removeEventListener('click', handleClick);
  });
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function setStatusText() {
  statusText.textContent = `${oTurn ? "O" : "X"}'s Turn`;
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function highlightWinningCells(currentClass) {
  WINNING_COMBINATIONS.forEach(combination => {
    if (combination.every(index => cellElements[index].classList.contains(currentClass))) {
      combination.forEach(index => cellElements[index].classList.add('winning'));
    }
  });
}
