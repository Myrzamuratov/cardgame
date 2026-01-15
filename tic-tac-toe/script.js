let currentplayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function handlePlayerTurn(clickCellIndex) {
  if (gameBoard[clickCellIndex] !== "" || !gameActive) {
    return;
  }
  gameBoard[clickCellIndex] = currentplayer;
  currentplayer = currentplayer === "X" ? "O" : "X";
  console.log(currentplayer);
}

const cells = document.querySelectorAll(".cell");
console.log(cells);

cells.forEach((cell) => {
  cell.addEventListener("click", cellClicked);
  console.log(cell);
});

function cellClicked(clickedCellEvent) {
  console.log(clickedCellEvent);

  const clickedCell = clickedCellEvent.target;
  const clickCellIndex = parseInt(clickedCell.id.replace("cell-", "")) - 1;

  if (gameBoard[clickCellIndex] !== "" || !gameActive) {
    return;
  }

  handlePlayerTurn(clickCellIndex);
  updateUI();
  checkedForWinOrDraw();
}

function updateUI() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = gameBoard[i];
  }
}

const winConditions = [
  [0, 1, 2], // Верхний ряд
  [3, 4, 5], // Средний ряд
  [6, 7, 8], // Нижний ряд
  [0, 3, 6], // Левый столбец
  [1, 4, 7], // Средний столбец
  [2, 5, 8], // Правый столбец
  [0, 4, 8], // Диагональ слева направо
  [2, 4, 6], // Диагональ справа налево
];

function checkedForWinOrDraw() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    const lastPlayer = currentplayer === "X" ? "O" : "X";
    announceWinner(lastPlayer);
    gameActive = false;
    return;
  }

  let roundDraw = !gameBoard.includes("");
  if (roundDraw) {
    announceDraw();
    gameActive = false;
    return;
  }
}

function announceWinner(player) {
  const messageElement = document.getElementById("gameMessage");
  let looserplayer = player === "X" ? "O" : "X";
  messageElement.innerText = `Игрок ${player} победил, а Диана лох`;
}
function announceDraw() {
  const messageElement = document.getElementById("gameMessage");
  messageElement.innerText = "Ничья лохи";
}

function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentplayer = "X";
  cells.forEach((cell) => {
    cell.innerText = "";
  });
  document.getElementById("gameMessage").innerText = "";
}

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetGame, false);

const backButton = document.getElementById("backToMenu");
backButton.addEventListener("click", () => {
  window.location.href = "../index.html"; // возвращаемся в корень
});
