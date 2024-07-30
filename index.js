let div = document.getElementById("container");
let currentMode;
let minesArray = [];
let indexArray = [];

function displayMines(row, col) {
  let value = 1;

  div = "";
  for (let i = 0; i < row; i++) {
    minesArray[i] = [];
    div += "<br/>";
    for (let j = 0; j < col; j++) {
      minesArray[i][j] = value++;
      div += `<div class="mines" id="${minesArray[i][j]}">&nbsp;</div>`;
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

    if (minesArray[randomRow][randomCol] !== "*") {
      document.getElementById(`${minesArray[randomRow][randomCol]}`).innerHTML =
        "*";
      minesArray[randomRow][randomCol] = "*";
      indexArray.push([randomRow, randomCol]);
      currentMine++;
    }
    // sideValues();
  }
  console.log(indexArray);
}

function sideValues() {
  for (let i = 1; i <= minesArray.length; i++) {
    for (let j = 1; j <= minesArray.length; j++) {
      if (minesArray[i - 1][j - 1] != "*") {
        document.getElementById(`${minesArray[i - 1][j - 1]}`).innerHTML = 1;
      }
      if (minesArray[i - 1][j] != "*") {
        document.getElementById(`${minesArray[i - 1][j]}`).innerHTML = 1;
      }
      if (minesArray[i - 1][j + 1] != "*") {
        document.getElementById(`${minesArray[i - 1][j + 1]}`).innerHTML = 1;
      }
      if (minesArray[i][j - 1] != "*") {
        document.getElementById(`${minesArray[i][j - 1]}`).innerHTML = 1;
      }
      if (minesArray[i][j + 1] != "*") {
        document.getElementById(`${minesArray[i][j + 1]}`).innerHTML = 1;
      }
      if (minesArray[i + 1][j - 1] != "*") {
        document.getElementById(`${minesArray[i + 1][j - 1]}`).innerHTML = 1;
      }
      if (minesArray[i + 1][j] != "*") {
        document.getElementById(`${minesArray[i + 1][j]}`).innerHTML = 1;
      }
      if (minesArray[i + 1][j + 1] != "*") {
        document.getElementById(`${minesArray[i + 1][j + 1]}`).innerHTML = 1;
      }
    }
  }
}
