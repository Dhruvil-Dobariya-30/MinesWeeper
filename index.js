let div = document.getElementById("container");
let currentMode;
let minesArray = [];
let minesPositions = [];

let customMines;
function setMode(id) {
  currentMode = id;
  // console.log(currentMode);

  if (currentMode == "easy") {
    displayBox(10, 10);
    generateNumber(10, 10, 10);
    hideModeDiv();
  } else if (currentMode == "medium") {
    displayBox(16, 16);
    generateNumber(40, 16, 16);
    hideModeDiv();
  } else if (currentMode == "hard") {
    displayBox(16, 30);
    generateNumber(99, 16, 30);
    hideModeDiv();
  } else {
    let customRow = prompt("enter No. Of Rows");
    let customCols = prompt("enter No. Of Columns");
    customMines = prompt("enter No. Of Mines");
    displayBox(customRow, customCols);
    generateNumber(customMines, customRow, customCols);
    hideModeDiv();
  }
}

function hideModeDiv() {
  let div = document.querySelector(".selectMode");
  let top = document.querySelector("#top");

  div.style.display = "none";
  top.innerHTML += `<button onclick="restartGame()" class="resetBtn">&#10227;</button>`;
}

function displayBox(row, col) {
  let value = 1;

  let data = "";
  for (let i = 0; i < row; i++) {
    minesArray[i] = [];
    data += "<br/>";
    for (let j = 0; j < col; j++) {
      minesArray[i][j] = value++;
      data += `<div class="mines count" id="${minesArray[i][j]}" onclick="validateMine(this.id)">&nbsp;</div>`;
    }
  }
  div.innerHTML = data;
}

function generateNumber(totalMine, row, col) {
  // console.log(totalMine, row, col);
  let currentMine = 0;
  while (currentMine < totalMine) {
    let randomRow = Math.floor(Math.random() * row);
    let randomCol = Math.floor(Math.random() * col);

    if (minesArray[randomRow][randomCol] !== "&#128163;") {
      minesPositions.push(minesArray[randomRow][randomCol]);

      document.getElementById(
        `${minesArray[randomRow][randomCol]}`
      ).innerHTML = `<span class="data" data-mine="true">&#128163;</span>`;
      minesArray[randomRow][randomCol] = "&#128163;";
      currentMine++;
    }
    sideValues();
  }
  document.querySelector(".mine").innerHTML = "Mines : " + totalMine;
  document.querySelector(".size").innerHTML = "Size : " + row + "X" + col;
  document.querySelector(".mine").style.padding = "10px";
  document.querySelector(".size").style.padding = "10px";
  document.querySelector(".boxLeft").style.padding = "10px";
  console.log(minesArray);
}

function sideValues() {
  for (let i = 0; i < minesArray.length; i++) {
    for (let j = 0; j < minesArray[i].length; j++) {
      if (minesArray[i][j] !== "&#128163;") {
        let sideCounts = 0;
        if (i > 0 && j > 0 && minesArray[i - 1][j - 1] === "&#128163;") {
          sideCounts++;
        }

        if (i > 0 && minesArray[i - 1][j] === "&#128163;") {
          sideCounts++;
        }

        if (
          i > 0 &&
          j < minesArray[i].length - 1 &&
          minesArray[i - 1][j + 1] === "&#128163;"
        ) {
          sideCounts++;
        }

        if (j > 0 && minesArray[i][j - 1] === "&#128163;") {
          sideCounts++;
        }

        if (
          j < minesArray[i].length - 1 &&
          minesArray[i][j + 1] === "&#128163;"
        ) {
          sideCounts++;
        }

        if (
          i < minesArray.length - 1 &&
          j > 0 &&
          minesArray[i + 1][j - 1] === "&#128163;"
        ) {
          sideCounts++;
        }

        if (i < minesArray.length - 1 && minesArray[i + 1][j] === "&#128163;") {
          sideCounts++;
        }

        if (
          i < minesArray.length - 1 &&
          j < minesArray[i].length - 1 &&
          minesArray[i + 1][j + 1] === "&#128163;"
        ) {
          sideCounts++;
        }

        if (sideCounts > 0) {
          document.getElementById(`${minesArray[i][j]}`).innerHTML = sideCounts;
        }
      }
    }
  }
}

function validateMine(id) {
  let visible = document.getElementById(id);
  visible.style.fontSize = "24px";

  if (visible.innerHTML == "&nbsp;") {
    visible.classList.remove("count");
    visible.style.backgroundColor = "white";
    openSpaces(id);
  } else {
    let isMine = visible.querySelector('.data[data-mine="true"]');
    if (isMine) {
      // console.log("GAME OVER!!!");
      document.querySelector("#msg").innerHTML = "GAME OVER!!!";
      displayAllMines();
    } else {
      visible.style.backgroundColor = "white";
      visible.classList.remove("count");
    }
  }
  isWinner();
}

function displayAllMines() {
  for (let i = 0; i < minesPositions.length; i++) {
    let cell = document.getElementById(minesPositions[i]);
    cell.style.fontSize = "24px";
    cell.style.backgroundColor = "red";
    cell.style.border = "1px solid black";
    cell.innerHTML = "&#128163;";
    cell.style.transition = "linear 0.1s";
    disableAllCells();
  }
}

function disableAllCells() {
  let allCells = document.querySelectorAll(".mines");
  for (i = 0; i < allCells.length; i++) {
    allCells[i].classList.add("disabled");
  }
}

function revealAllMines() {
  for (let mine of minesPositions) {
    let cell = document.getElementById(mine);
    cell.style.fontSize = "24px";
    cell.style.backgroundColor = "red";
    cell.innerHTML = "&#128163;";

    cell.classList.add("disableMine");
  }
}

function openSpaces(id) {
  let i, j;

  for (let x in minesArray) {
    for (let y in minesArray[x]) {
      if (minesArray[x][y] == id) {
        i = parseInt(x);
        j = parseInt(y);
      }
    }
  }

  if (i > 0 && j > 0) {
    openCells(i - 1, j - 1);
  }
  if (i > 0) {
    openCells(i - 1, j);
  }
  if (i > 0 && j < minesArray[0].length - 1) {
    openCells(i - 1, j + 1);
  }
  if (j > 0) {
    openCells(i, j - 1);
  }
  if (j < minesArray[0].length - 1) {
    openCells(i, j + 1);
  }
  if (i < minesArray.length - 1 && j > 0) {
    openCells(i + 1, j - 1);
  }
  if (i < minesArray.length - 1) {
    openCells(i + 1, j);
  }
  if (i < minesArray.length - 1 && j < minesArray[0].length - 1) {
    openCells(i + 1, j + 1);
  }
  isWinner();
}

function openCells(i, j) {
  let id = minesArray[i][j];
  let cell = document.getElementById(id);

  if (cell.style.backgroundColor !== "white") {
    cell.style.backgroundColor = "white";
    cell.style.fontSize = "24px";
    cell.classList.remove("count");

    if (cell.innerHTML === "&nbsp;") {
      openSpaces(id);
    }
  }
}

function restartGame() {
  location.reload();
}

function isWinner() {
  let mines;
  let customMine = parseInt(customMines);

  mines =
    currentMode == "easy"
      ? 10
      : currentMode == "medium"
      ? 40
      : currentMode == "hard"
      ? 99
      : customMine;

  let allDivCount = document.querySelectorAll(".count");

  if (allDivCount.length === mines) {
    // console.log("WON");
    // console.log(mines, allDivCount.length);
    document.querySelector("#msg").innerHTML = "YOU WON!!!";
    document.querySelector("#msg").style.color = "green";
  }

  document.querySelector(".boxLeft").innerHTML = `Box Left : ${
    allDivCount.length - mines
  }`;
}
