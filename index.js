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

    if (minesArray[randomRow][randomCol] !== "&#128163;") {
      document.getElementById(`${minesArray[randomRow][randomCol]}`).innerHTML =
        "&#128163;";
      minesArray[randomRow][randomCol] = "&#128163;";
      // indexArray.push([randomRow, randomCol].join(""));
      currentMine++;
      sideValues(row, col);
    }
  }
  console.log(minesArray);
}

function sideValues(r, c) {
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      let count = 0;
      if (minesArray[i][j] == "&#128163;") {
        if (i > 0 && j > 0 && minesArray[i - 1][j - 1] != "&#128163;") {
          document.getElementById(`${minesArray[i - 1][j - 1]}`).innerHTML =
            incrementNumber(i - 1, j - 1);
        }
        if (i > 0 && minesArray[i - 1][j] != "&#128163;") {
          document.getElementById(`${minesArray[i - 1][j]}`).innerHTML =
            incrementNumber(i - 1, j);
        }
        if (
          i > 0 &&
          j < minesArray.length - 1 &&
          minesArray[i - 1][j + 1] != "&#128163;"
        ) {
          document.getElementById(`${minesArray[i - 1][j + 1]}`).innerHTML =
            incrementNumber(i - 1, j + 1);
        }
        if (j > 0 && minesArray[i][j - 1] != "&#128163;") {
          document.getElementById(`${minesArray[i][j - 1]}`).innerHTML =
            incrementNumber(i, j - 1);
        }
        if (j < minesArray.length - 1 && minesArray[i][j + 1] != "&#128163;") {
          document.getElementById(`${minesArray[i][j + 1]}`).innerHTML =
            incrementNumber(i, j + 1);
        }
        if (
          i < minesArray.length - 1 &&
          j > 0 &&
          minesArray[i + 1][j - 1] != "&#128163;"
        ) {
          document.getElementById(`${minesArray[i + 1][j - 1]}`).innerHTML =
            incrementNumber(i + 1, j - 1);
        }
        if (i < minesArray.length - 1 && minesArray[i + 1][j] != "&#128163;") {
          document.getElementById(`${minesArray[i + 1][j]}`).innerHTML =
            incrementNumber(i + 1, j);
        }
        if (
          i < minesArray.length - 1 &&
          j < minesArray.length - 1 &&
          minesArray[i + 1][j + 1] != "&#128163;"
        ) {
          document.getElementById(`${minesArray[i + 1][j + 1]}`).innerHTML =
            incrementNumber(i + 1, j + 1);
        }
      }
    }
  }
}

function incrementNumber(i, j) {
  let getDiv = document.getElementById(`${minesArray[i][j]}`);
  if (getDiv.innerHTML == "&nbsp;") {
    return 1;
  } else {
    return getDiv.innerHTML++;
  }
}
