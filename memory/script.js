const emojis = [
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "🐨",
  "🐯",
  "🦁",
  "🐮",
  "🐷",
  "🐸",
  "🐵",
  "🐔",
  "🐧",
  "🐦",
  "🐤",
  "🐣",
  "🐢",
  "🐍",
  "🦎",
  "🦖",
  "🦕",
  "🐙",
  "🦑",
  "🦐",
  "🦞",
  "🦀",
];

let numberOfCards;
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function startGame() {
  const width = parseInt(document.getElementById("width").value, 10);
  const height = parseInt(document.getElementById("height").value, 10);

  if (isOutOfRange(width, 4, 11)) {
    alert("Ширина должна быть от 4 до 11");
    return;
  }
  if (isOutOfRange(height, 3, 6)) {
    alert("Высота должна быть от 3 до 6");
    return;
  }

  reset();
  setUpBoard(width, height);
}

function setUpBoard(width, height) {
  const board = document.getElementById("board");
  board.innerHTML = "";
  board.style.gridTemplateColumns = `repeat(${width}, 100px)`;
  board.style.gridTemplateRows = `repeat(${height}, 100px)`;

  numberOfCards = width * height;

  // 1. Берём случайные эмодзи
  const selectedEmojis = shuffleArray([...emojis]).slice(0, numberOfCards / 2);

  // 2. Делаем пары и перемешиваем их
  const gameEmojis = shuffleArray([...selectedEmojis, ...selectedEmojis]);

  // 3. Если нечётное количество карт – добавляем пустую
  if (numberOfCards % 2 === 1) {
    gameEmojis.push("");
  }

  // 4. Рендерим карточки
  gameEmojis.forEach((emoji) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;

    const emojiElement = document.createElement("span");
    emojiElement.textContent = emoji;
    emojiElement.style.visibility = "hidden";

    card.appendChild(emojiElement);
    card.addEventListener("click", () => flipCard(card, emojiElement));

    board.appendChild(card);
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function flipCard(card, emojiElement) {
  if (
    lockBoard === true ||
    card === firstCard ||
    card.classList.contains("matched")
  ) {
    return;
  }

  card.classList.add("flipped");
  emojiElement.style.visibility = "visible";

  if (firstCard == null) {
    firstCard = card;
  } else {
    secondCard = card;
    checkForMatch();
  }
}
function checkForMatch() {
  const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;

  if (isMatch) {
    disableCard();
  } else unflipCards();
}
function disableCard() {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");

  const adjustedTotal =
    numberOfCards % 2 === 0 ? numberOfCards : numberOfCards - 1;
  if (document.querySelectorAll(".card.matched").length === adjustedTotal) {
    setTimeout(() => {
      alert("Победа!");
    }, 500);
  }
  reset();
}
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");

    firstCard.firstChild.style.visibility = "hidden";
    secondCard.firstChild.style.visibility = "hidden";
    reset();
  }, 1000);
}
function reset() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}
function isOutOfRange(val, minVal, maxVal) {
  return val < minVal || val > maxVal;
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

document.getElementById("start-button").addEventListener("click", startGame);
const backButton = document.getElementById("backToMenu");
backButton.addEventListener("click", () => {
  window.location.href = "../index.html"; // возвращаемся в корень
});
