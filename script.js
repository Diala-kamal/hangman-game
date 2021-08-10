const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popUp = document.getElementById("popup-container");
const notifications = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const figureParts = document.querySelectorAll(".figure-part");
const words = [
  "application",
  "programming",
  "development",
  "wizard",
  "interface",
];
let selectedWord = words[Math.floor(Math.random() * words.length)];
const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
  wordEl.innerHTML = `
      ${selectedWord
        .split("")
        .map(
          (letter) => `
            <span class="letter">
              ${correctLetters.includes(letter) ? letter : ""}
            </span>
          `
        )
        .join("")}
    `;

  const innerWord = wordEl.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! 😃";
    popUp.style.display = "flex";
  }
}
//update the wrong letter
function updateWrongLettersEl() {
  //display wrong letters
  wrongLettersEl.innerHTML = `
${wrongLetters.length > 0 ? "<p>Wrong</p>" : " "}
${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;
  //display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
  //check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. 😕";
    popUp.style.display = "flex";
  }
}
//show notification
function showNotifications() {
  notifications.classList.add("show");
  setTimeout(() => {
    notifications.classList.remove("show");
  }, 2000);
}
//keydown letter press
window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotifications();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotifications();
      }
    }
  }
});
//restart game and play again
playAgainBtn.addEventListener("click", () => {
  //empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLettersEl();
  popUp.style.display = "none";
});

displayWord();
