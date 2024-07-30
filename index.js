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
  console.log(minesArray);
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
  displayMines();
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
  for (let i = 1; i <= totalMine; i++) {
    let randomRaw = Math.floor(Math.random() * row);
    let randomCol = Math.floor(Math.random() * col);

    document.getElementById(`${minesArray[randomRaw][randomCol]}`).innerHTML =
      "*";

    minesArray[randomRaw][randomCol] = "*";
    indexArray.push([randomRaw, randomCol]);
    sideValues(randomRaw, randomCol);

    // if (!indexArray.includes([randomRaw, randomCol])) {
    //   indexArray.push([randomRaw, randomCol]);
    //     document.getElementById(`${minesArray[randomRaw][randomCol]}`).innerHTML =
    //       "*";
    // } else {
    //   generateNumber();
    // }
  }
  console.log(minesArray);
  console.log(indexArray);
}

// function sideValues(i, j) {
//   let topLeft = document.getElementById(`${minesArray[i - 1][j - 1]}`);
//   let topMid = document.getElementById(`${minesArray[i - 1][j]}`);
//   let topRight = document.getElementById(`${minesArray[i - 1][j + 1]}`);
//   let MidLeft = document.getElementById(`${minesArray[i][j - 1]}`);
//   let midRight = document.getElementById(`${minesArray[i][j + 1]}`);
//   let bottomLeft = document.getElementById(`${minesArray[i + 1][j - 1]}`);
//   let bottomMid = document.getElementById(`${minesArray[i + 1][j]}`);
//   let bottomRight = document.getElementById(`${minesArray[i + 1][j + 1]}`);
//   console.log(i, j);
// }

function sideValues(i, j) {
  if (minesArray[i - 1][j - 1] != "*") {
    minesArray[i - 1][j - 1] = "@";
  } else if (minesArray[i - 1][j] != "*") {
    minesArray[i - 1][j] = "@";
  } else if (minesArray[i - 1][j + 1] != "*") {
    minesArray[i - 1][j + 1] = "@";
  } else if (minesArray[i][j - 1] != "*") {
    minesArray[i][j - 1] = "@";
  } else if (minesArray[i][j + 1] != "*") {
    minesArray[i][j + 1] = "@";
  }
}
