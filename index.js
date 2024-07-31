let div = document.getElementById("container");
let currentMode;
let minesArray = [];
let indexArray = [];

function displayMines(row, col) {
  let value = 0;

  div = "";
  for (let i = 0; i < row; i++) {
    minesArray[i] = [];
    div += "<br/>";
    for (let j = 0; j < col; j++) {
      minesArray[i][j] = value++;
      div += `<div class="mines data" id="${minesArray[i][j]}" onclick="validateMine(this.id)">&nbsp;</div>`;
    }
  }

  document.getElementById("container").innerHTML = div;
}

function setMode(id) {
  currentMode = id;

  if (currentMode == "easy") {
    displayMines(9, 9);
    generateNumber(10, 9, 9);
    toggleModeDiv("hide");
  } else if (currentMode == "intermediate") {
    displayMines(16, 16);
    generateNumber(40, 16, 16);
    toggleModeDiv("hide");
  } else if (currentMode == "expert") {
    displayMines(16, 30);
    generateNumber(99, 16, 30);
    toggleModeDiv("hide");
  } else {
    let customRow = prompt("enter No. Of Rows");
    let customCols = prompt("enter No. Of Columns");
    let customMines = prompt("enter No. Of Mines");
    displayMines(customRow, customCols);
    generateNumber(customMines, customRow, customCols);
    toggleModeDiv("hide");
  }
}

function toggleModeDiv(msg) {
  let div = document.querySelector(".selectMode");
  if (msg == "hide") {
    div.style.display = "none";
  } else {
    div.style.display = "block";
  }
}

function restartGame() {
  location.reload();
  toggleModeDiv("show");
}

function generateNumber(totalMine, row, col) {
  let currentMine = 0;
  while (currentMine < totalMine) {
    let randomRow = Math.floor(Math.random() * row);
    let randomCol = Math.floor(Math.random() * col);

    if (minesArray[randomRow][randomCol] !== "&#128163;") {
      document.getElementById(
        `${minesArray[randomRow][randomCol]}`
      ).innerHTML = ` <span class="data">&#128163;</span>`;
      minesArray[randomRow][randomCol] = "&#128163;";
      indexArray.push([randomRow, randomCol]);
      currentMine++;
      sideValues(row, col);
    }
  }
  console.log(minesArray);
}

function sideValues(r, c) {
  let numbersArray = Array(r)
    .fill()
    .map(() => Array(c).fill(0));

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (minesArray[i][j] == "&#128163;") {
        if (i > 0 && j > 0 && minesArray[i - 1][j - 1] != "&#128163;") {
          numbersArray[i - 1][j - 1]++;
        }
        if (i > 0 && minesArray[i - 1][j] != "&#128163;") {
          numbersArray[i - 1][j]++;
        }
        if (
          i > 0 &&
          j < minesArray.length - 1 &&
          minesArray[i - 1][j + 1] != "&#128163;"
        ) {
          numbersArray[i - 1][j + 1]++;
        }
        if (j > 0 && minesArray[i][j - 1] != "&#128163;") {
          numbersArray[i][j - 1]++;
        }
        if (j < minesArray.length - 1 && minesArray[i][j + 1] != "&#128163;") {
          numbersArray[i][j + 1]++;
        }
        if (
          i < minesArray.length - 1 &&
          j > 0 &&
          minesArray[i + 1][j - 1] != "&#128163;"
        ) {
          numbersArray[i + 1][j - 1]++;
        }
        if (i < minesArray.length - 1 && minesArray[i + 1][j] != "&#128163;") {
          numbersArray[i + 1][j]++;
        }
        if (
          i < minesArray.length - 1 &&
          j < minesArray.length - 1 &&
          minesArray[i + 1][j + 1] != "&#128163;"
        ) {
          numbersArray[i + 1][j + 1]++;
        }
      }
    }
  }

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (minesArray[i][j] != "&#128163;" && numbersArray[i][j] > 0) {
        document.getElementById(
          `${minesArray[i][j]}`
        ).innerHTML = `${numbersArray[i][j]}`;
      }
    }
  }
}

function validateMine(id) {
  let visible = document.getElementById(id);
  visible.style.fontSize = "24px";

  if (visible.innerHTML == "&nbsp;") {
    openSpaces(id);
  } else {
    if (visible.children[0].innerHTML !== "&nbsp;") {
      console.log("GAME OVER!!!");
      alert("GAME OVER!!!");
    }
  }
}

function openSpaces(id) {
  console.log(id);
  console.log("Space Found");

  let i;
  let j;

  let count = 0;
  for (let x in minesArray) {
    for (let y in minesArray) {
      if (minesArray[x][y] == id) {
        i = x;
        j = y;
      } else {
        count++;
      }
    }
  }
  console.log(i, j);

  if (minesArray[i][j + 1] == "&nbsp;") {
    console.log("object");
    document.getElementById(`${minesArray[i][j]}`).style.backgroundColor =
      "white";
  }
}
