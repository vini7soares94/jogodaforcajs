let word;
let guessedLetters = [];
let remainingAttempts = 8;
let correctCount = 0;
let errorsCount = 0;

const wordDisplay = document.getElementById("word");
const lettersDisplay = document.getElementById("letters");
const remainingDisplay = document.getElementById("remaining");
const errorsDisplay = document.getElementById("errors");
const correctDisplay = document.getElementById("correct");
const newGameBtn = document.getElementById("newGameBtn");

function startGame(theme) {
  const themes = {
    frutas: ["banana", "maçã", "uva", "laranja", "abacaxi", "morango"],
    animais: ["cachorro", "gato", "elefante", "leão", "tigre", "girafa"],
    paises: ["brasil", "estados unidos", "china", "índia", "rússia", "canadá"],
    nomes: ["joão", "maria", "josé", "ana", "antônio", "francisco", "carlos", "pedro", "paulo", "lucas", "luiz", "marcos", "miguel", "rafael", "guilherme", "gustavo", "daniel", "bruno", "eduardo", "felipe", "andré", "thiago", "leonardo", "gabriel", "fernando", "roberto", "rodrigo", "matheus", "ricardo", "samuel", "henrique", "marcelo", "alexandre", "vinícius", "diego", "douglas", "ivan", "leandro", "wagner", "augusto", "alan", "otávio", "rafaela", "amanda", "jéssica", "letícia", "camila", "fernanda", "isabela", "bruna", "vinicius", "victoria"]
  };
  word = themes[theme][Math.floor(Math.random() * themes[theme].length)];
  guessedLetters = [];
  remainingAttempts = 8;
  correctCount = 0;
  errorsCount = 0;
  document.getElementById("chooseCategoryMsg").style.display = "none";
  document.getElementById("newGameBtn").style.display = "inline-block";
  initialize();
}

function initialize() {
  wordDisplay.innerHTML = word
    .split("")
    .map(letter => guessedLetters.includes(letter) ? letter : "_")
    .join(" ");

  remainingDisplay.textContent = remainingAttempts;
  errorsDisplay.textContent = errorsCount;
  correctDisplay.textContent = correctCount;
}

function guess(letter) {
  if (!guessedLetters.includes(letter)) {
    guessedLetters.push(letter);
    if (!word.includes(letter)) {
      remainingAttempts--;
      errorsCount++;
    } else {
      correctCount++;
    }
  }

  initialize();

  if (remainingAttempts === 0) {
    alert("Você perdeu! A palavra era: " + word);
    newGame();
  } else if (!wordDisplay.textContent.includes("_")) {
    alert("Parabéns! Você acertou a palavra!");
    newGame();
  }
}

function newGame() {
  newGameBtn.style.display = "inline-block";
}

document.addEventListener("keypress", function(event) {
  const letter = String.fromCharCode(event.keyCode).toLowerCase();
  if (/[a-z]/.test(letter)) {
    guess(letter);
  }
});

newGameBtn.addEventListener("click", function() {
  newGameBtn.style.display = "none";
  document.getElementById("letters").innerHTML = "";
  document.getElementById("word").innerHTML = "";
  startGame(currentTheme);
});
