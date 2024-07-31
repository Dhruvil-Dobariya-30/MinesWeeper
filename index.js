let div = document.getElementById("container");
let currentMode;
let minesArray = [];
let minesPositions = [];

function displayMines(row, col) {
  let value = 1;

  let data = "";
  for (let i = 0; i < row; i++) {
    minesArray[i] = [];
    data += "<br/>";
    for (let j = 0; j < col; j++) {
      minesArray[i][j] = value++;
      data += `<div class="mines" id="${minesArray[i][j]}" onclick="validateMine(this.id)">&nbsp;</div>`;
    }
  }
  div.innerHTML = data;
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

function generateNumber(totalMine, row, col) {
  let currentMine = 0;
  while (currentMine < totalMine) {
    let randomRow = Math.floor(Math.random() * row);
    let randomCol = Math.floor(Math.random() * col);

    if (minesArray[randomRow][randomCol] !== "*") {
      minesPositions.push(minesArray[randomRow][randomCol]);

      document.getElementById(
        `${minesArray[randomRow][randomCol]}`
      ).innerHTML = `<span class="data" data-mine="true">&#128163;</span>`;
      minesArray[randomRow][randomCol] = "&#128163;";
      currentMine++;
    }
    sideValues();
  }
  console.log(minesArray);
}

function sideValues() {
  for (let i = 0; i < minesArray.length; i++) {
    for (let j = 0; j < minesArray[i].length; j++) {
      if (minesArray[i][j] !== "&#128163;") {
        let count = 0;
        if (i > 0 && j > 0 && minesArray[i - 1][j - 1] === "&#128163;") count++;
        if (i > 0 && minesArray[i - 1][j] === "&#128163;") count++;
        if (
          i > 0 &&
          j < minesArray[i].length - 1 &&
          minesArray[i - 1][j + 1] === "&#128163;"
        )
          count++;
        if (j > 0 && minesArray[i][j - 1] === "&#128163;") count++;
        if (
          j < minesArray[i].length - 1 &&
          minesArray[i][j + 1] === "&#128163;"
        )
          count++;
        if (
          i < minesArray.length - 1 &&
          j > 0 &&
          minesArray[i + 1][j - 1] === "&#128163;"
        )
          count++;
        if (i < minesArray.length - 1 && minesArray[i + 1][j] === "&#128163;")
          count++;
        if (
          i < minesArray.length - 1 &&
          j < minesArray[i].length - 1 &&
          minesArray[i + 1][j + 1] === "&#128163;"
        )
          count++;
        if (count > 0) {
          document.getElementById(`${minesArray[i][j]}`).innerHTML = count;
        }
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
    let isMine = visible.querySelector('.data[data-mine="true"]');
    if (isMine) {
      console.log("GAME OVER!!!");
      alert("GAME OVER!!!");
      revealAllMines();
    } else {
      visible.style.backgroundColor = "white";
    }
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
    revealCell(i - 1, j - 1);
  }
  if (i > 0) {
    revealCell(i - 1, j);
  }
  if (i > 0 && j < minesArray[0].length - 1) {
    revealCell(i - 1, j + 1);
  }
  if (j > 0) {
    revealCell(i, j - 1);
  }
  if (j < minesArray[0].length - 1) {
    revealCell(i, j + 1);
  }
  if (i < minesArray.length - 1 && j > 0) {
    revealCell(i + 1, j - 1);
  }
  if (i < minesArray.length - 1) {
    revealCell(i + 1, j);
  }
  if (i < minesArray.length - 1 && j < minesArray[0].length - 1) {
    revealCell(i + 1, j + 1);
  }
}

function revealCell(i, j) {
  let id = minesArray[i][j];
  let cell = document.getElementById(id);

  if (cell.style.backgroundColor !== "white") {
    cell.style.backgroundColor = "white";
    cell.style.fontSize = "24px";

    if (cell.innerHTML === "&nbsp;") {
      openSpaces(id);
    }
  }
}

function restartGame() {
  location.reload();
  toggleModeDiv("show");
}
