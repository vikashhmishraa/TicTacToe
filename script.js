let startBtn = document.querySelector(".startBtn");
let resetBtn = document.querySelector(".resetBtn");
let reStartBtn = document.querySelector(".restartBtn");
let playersTurn = document.querySelector(".playersTurn");
let congratulationText = document.querySelector(".congratulations");
let currentPlayer = "X";
let boxGrid = document.querySelector(".grid");
let winner = document.querySelector(".winner");
let cont = document.querySelector(".cont");
let arr = Array(9).fill(null);

let playerXscore = document.querySelector(".playerX-score");
let playerOscore = document.querySelector(".playerO-score");

let scoreOfx = {
  sign: "X",
  score: 0,
};
let scoreOfo = {
  sign: "O",
  score: 0,
};

let updatedScoreOfx = JSON.parse(localStorage.getItem("Player-X-Score"));
let updatedScoreOfo = JSON.parse(localStorage.getItem("Player-O-Score"));

scoreOfx.score = [...updatedScoreOfx];
scoreOfo.score = [...updatedScoreOfo];
function handleClick(el) {
  checkStart();
  const id = Number(el.id);
  if (arr[id] !== null) return;
  arr[id] = currentPlayer;
  el.innerText = currentPlayer;
  checkWinner();
  currentPlayer = currentPlayer === "X" ? "O" : "X";

  console.log(arr);
  playersTurn.innerHTML = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
  if (
    (arr[0] !== null && arr[0] == arr[1] && arr[1] == arr[2]) ||
    (arr[3] !== null && arr[3] == arr[4] && arr[4] == arr[5]) ||
    (arr[6] !== null && arr[6] == arr[7] && arr[7] == arr[8]) ||
    (arr[0] !== null && arr[0] == arr[3] && arr[3] == arr[6]) ||
    (arr[1] !== null && arr[1] == arr[4] && arr[4] == arr[7]) ||
    (arr[2] !== null && arr[2] == arr[5] && arr[5] == arr[8]) ||
    (arr[0] !== null && arr[0] == arr[4] && arr[4] == arr[8]) ||
    (arr[2] !== null && arr[2] == arr[4] && arr[4] == arr[6])
  ) {
    console.log(currentPlayer);
    // document.write(`Winner is ${currentPlayer}`);
    // winnerIs.innerText = `Winner is ${currentPlayer}`;
    playersTurn.classList.add("noDisplay");
    congratulationText.classList.remove("noDisplay");
    boxGrid.classList.add("noDisplay");

    let winnerDiv = document.createElement("div");

    winnerDiv.innerHTML = ` <p class="winnerAnnounce">
          Player
          <br />
          ${currentPlayer}
          <br />
          Wins
        </p>`;

    winner.appendChild(winnerDiv);
    startBtn.innerHTML = `<div onclick="reStartGame()" class="reStartBtn">RESTART</div>`;

    if (scoreOfx.sign == currentPlayer) {
      console.log("x won");
      scoreOfx.score += 1;
      playerXscore.innerHTML = scoreOfx.score;
    } else if (scoreOfo.sign == currentPlayer) {
      scoreOfo.score += 1;
      playerOscore.innerHTML = scoreOfo.score;
    }
    return;
  }

  if (!arr.some((e) => e == null)) {
    // document.write(`Its a Draw `);
    playersTurn.classList.add("noDisplay");
    congratulationText.classList.add("noDisplay");
    boxGrid.classList.add("noDisplay");

    let GameTie = document.createElement("div");

    GameTie.innerHTML = `<p class="gameTie">Game Tie !!</p>`;

    winner.appendChild(GameTie);
  }
  return;
}

function checkStart() {
  if (boxGrid.classList.contains("readOnly")) {
    console.log("Btn Clicked");
    // alert("Please Start The Game");
  }
}
function startBtnFn() {
  boxGrid.classList.remove("readOnly");
  startBtn.innerHTML = `<div onclick="resetGame()" class="resetBtn">RESET GAME</div>`;
}

function resetGame() {
  location.reload();
  // document.querySelectorAll(".grid div").forEach((el) => el.innerText);
  boxGrid.classList.add("readOnly");
}

function reStartGame() {
  console.log("resrart clicked");
  playersTurn.classList.remove("noDisplay");
  congratulationText.classList.add("noDisplay");
  winner.classList.add("noDisplay");
  boxGrid.classList.remove("noDisplay");
  location.reload();
  // startBtn.innerHTML = `<div onclick="startBtnFn()" class="startBtn">START</div>`;
  // document.querySelectorAll(".grid div").forEach((el) => (el.innerText = ""));
  // arr = Array(9).fill(null);
  localStorage.setItem("Player-X-Score", JSON.stringify(scoreOfx.score));
  localStorage.setItem("Player-O-Score", JSON.stringify(scoreOfo.score));
}

// reStartBtn.addEventListener("click", reStartGame);
