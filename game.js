class Game {
  constructor(difficulty) {
    this.difficulty = difficulty;
    this.score = { human: 0, computer: 0 };
    this.table = document.querySelector("#gameTable");
    this.cells = this.table.querySelectorAll("td");
    this.activeCell = null;
    this.humanScoreElement = document.querySelector("#humanScore");
    this.computerScoreElement = document.querySelector("#computerScore");
  }

  start() {
    this.reset();
    this.update();
  }

  reset() {
    this.score.human = 0;
    this.score.computer = 0;
    this.activeCell = null;
    this.humanScoreElement.textContent = "0";
    this.computerScoreElement.textContent = "0";
    this.cells.forEach((cell) => {
      cell.className = "";
      cell.onclick = null;
    });
  }

  update() {
    if (this.gameOver()) {
      this.showResults();
      return;
    }

    this.activateRandomCell();
    setTimeout(() => this.update(), this.difficulty);
  }

  gameOver() {
    return this.score.human + this.score.computer >= this.cells.length / 2;
  }

  showResults() {
    alert(
      this.score.human > this.score.computer
        ? "Ви перемогли!"
        : "Комп'ютер переміг!"
    );
  }

  activateRandomCell() {
    if (this.activeCell !== null) {
      this.activeCell.classList.add("red");
      this.score.computer++;
      this.computerScoreElement.textContent = this.score.computer;
    }

    const availableCells = Array.from(this.cells).filter(
      (cell) =>
        !cell.classList.contains("red") && !cell.classList.contains("green")
    );
    const newActiveCell =
      availableCells[Math.floor(Math.random() * availableCells.length)];

    if (newActiveCell) {
      newActiveCell.classList.add("blue");
      newActiveCell.onclick = () => {
        if (newActiveCell.classList.contains("blue")) {
          newActiveCell.classList.remove("blue");
          newActiveCell.classList.add("green");
          this.score.human++;
          this.humanScoreElement.textContent = this.score.human;
        }
      };
      if (this.activeCell !== null) {
        this.activeCell.classList.remove("blue");
        this.activeCell.onclick = null;
      }
      this.activeCell = newActiveCell;
    }
  }
}

// Заповнення таблиці рядками та комірками
const table = document.querySelector("#gameTable");
for (let i = 0; i < 10; i++) {
  const row = document.createElement("tr");
  for (let j = 0; j < 10; j++) {
    const cell = document.createElement("td");
    row.appendChild(cell);
  }
  table.appendChild(row);
}

// Створення гри та ініціалізація подій
const startButton = document.querySelector("#start");
const difficultySelect = document.querySelector("#difficulty");
let game = new Game(Number(difficultySelect.value));

startButton.onclick = () => game.start();
difficultySelect.onchange = () => {
  game = new Game(Number(difficultySelect.value));
};
