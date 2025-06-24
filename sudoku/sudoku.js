const hardcodedBoards = [
  [ // Board 1
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ],
  [ // Board 2
    [0, 0, 0, 2, 6, 0, 7, 0, 1],
    [6, 8, 0, 0, 7, 0, 0, 9, 0],
    [1, 9, 0, 0, 0, 4, 5, 0, 0],
    [8, 2, 0, 1, 0, 0, 0, 4, 0],
    [0, 0, 4, 6, 0, 2, 9, 0, 0],
    [0, 5, 0, 0, 0, 3, 0, 2, 8],
    [0, 0, 9, 3, 0, 0, 0, 7, 4],
    [0, 4, 0, 0, 5, 0, 0, 3, 6],
    [7, 0, 3, 0, 1, 8, 0, 0, 0],
  ],
  [ // Board 3
    [0, 0, 0, 0, 0, 0, 2, 0, 0],
    [0, 8, 0, 0, 0, 7, 0, 9, 0],
    [6, 0, 2, 0, 0, 0, 5, 0, 0],
    [0, 7, 0, 0, 6, 0, 0, 0, 0],
    [0, 0, 0, 9, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 4, 0],
    [0, 0, 5, 0, 0, 0, 6, 0, 3],
    [0, 9, 0, 4, 0, 0, 0, 7, 0],
    [0, 0, 6, 0, 0, 0, 0, 0, 0],
  ],
  [ // Board 4 (New)
    [0, 0, 0, 0, 0, 2, 0, 0, 0],
    [0, 8, 0, 0, 7, 0, 0, 9, 0],
    [6, 0, 2, 0, 0, 0, 5, 0, 0],
    [0, 7, 0, 0, 6, 0, 0, 0, 0],
    [0, 0, 0, 9, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 4, 0],
    [0, 0, 5, 0, 0, 0, 6, 0, 3],
    [0, 9, 0, 4, 0, 0, 0, 7, 0],
    [0, 0, 0, 5, 0, 0, 0, 0, 0],
    ],
  [ // Board 5
    [0, 2, 0, 6, 0, 8, 0, 0, 0],
    [5, 8, 0, 0, 0, 9, 7, 0, 0],
    [0, 0, 0, 0, 4, 0, 0, 0, 0],
    [3, 7, 0, 0, 0, 0, 5, 0, 0],
    [6, 0, 0, 0, 0, 0, 0, 0, 4],
    [0, 0, 8, 0, 0, 0, 0, 1, 3],
    [0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 9, 8, 0, 0, 0, 3, 6],
    [0, 0, 0, 3, 0, 6, 0, 9, 0],
  ],
  [ // Board 6
    [2, 0, 0, 3, 0, 0, 0, 0, 0],
    [8, 0, 4, 0, 6, 2, 0, 0, 3],
    [0, 1, 3, 8, 0, 0, 2, 0, 0],
    [0, 0, 0, 0, 2, 0, 3, 9, 0],
    [5, 0, 7, 0, 0, 0, 6, 0, 1],
    [0, 3, 2, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 9, 7, 4, 0],
    [7, 0, 0, 6, 4, 0, 1, 0, 9],
    [0, 0, 0, 0, 0, 1, 0, 0, 2],
  ]
];

let currentBoardIndex = 0;
let solutionBoard = [];
let board = [];
let isSolving = false;

function renderBoard(initialBoard) {
  const container = document.getElementById("sudoku-board");
  container.innerHTML = "";

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = document.createElement("input");
      cell.className = "sudoku-cell";
      cell.type = "text";
      cell.maxLength = 1;
      cell.dataset.row = i;
      cell.dataset.col = j;

      if (initialBoard[i][j] !== 0) {
        cell.value = initialBoard[i][j];
        cell.disabled = true;
        board[i][j] = initialBoard[i][j];
      } else {
        board[i][j] = 0;

        cell.addEventListener("input", () => {
          const val = parseInt(cell.value);
          if (!val || val < 1 || val > 9) {
            cell.classList.remove("correct");
            cell.classList.add("incorrect");
            return;
          }
          if (val === solutionBoard[i][j]) {
            board[i][j] = val;
            cell.classList.remove("incorrect");
            cell.classList.add("correct");
          } else {
            board[i][j] = val;
            cell.classList.remove("correct");
            cell.classList.add("incorrect");
          }
        });
      }

      cell.addEventListener("mouseover", () => {
        const all = document.querySelectorAll(".sudoku-cell");
        all.forEach(c => {
          const r = c.dataset.row;
          const c_ = c.dataset.col;
          if ((r == i || c_ == j) && !c.disabled) {
            c.classList.add("highlight");
          }
        });
      });
      cell.addEventListener("mouseout", () => {
        document.querySelectorAll(".sudoku-cell").forEach(c => c.classList.remove("highlight"));
      });

      container.appendChild(cell);
    }
  }
}

function isValid(board, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num || board[x][col] === num) return false;
  }

  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j] === num) return false;
    }
  }

  return true;
}

function solve(board) {
  const boardCopy = board.map(row => [...row]);

  function helper(i, j) {
    if (i === 9) return true;
    if (j === 9) return helper(i + 1, 0);
    if (boardCopy[i][j] !== 0) return helper(i, j + 1);

    for (let num = 1; num <= 9; num++) {
      if (isValid(boardCopy, i, j, num)) {
        boardCopy[i][j] = num;
        if (helper(i, j + 1)) return true;
        boardCopy[i][j] = 0;
      }
    }
    return false;
  }

  helper(0, 0);
  return boardCopy;
}

function generateBoard() {
  if (isSolving) return;
  const puzzle = hardcodedBoards[currentBoardIndex];
  currentBoardIndex = (currentBoardIndex + 1) % hardcodedBoards.length;
  board = puzzle.map(row => [...row]);
  solutionBoard = solve(board);
  renderBoard(puzzle);
}

function clearBoard() {
  if (isSolving) return;
  const inputs = document.querySelectorAll(".sudoku-cell");
  inputs.forEach(input => {
    if (!input.disabled) {
      input.value = "";
      input.classList.remove("correct", "incorrect");
    }
  });
  board = board.map((row, i) => row.map((_, j) => hardcodedBoards[currentBoardIndex][i][j] || 0));
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function solveSudoku() {
  if (isSolving) return;
  isSolving = true;
  const inputs = document.querySelectorAll(".sudoku-cell");

  async function helper(i, j) {
    if (i === 9) return true;
    if (j === 9) return await helper(i + 1, 0);
    if (board[i][j] !== 0) return await helper(i, j + 1);

    for (let num = 1; num <= 9; num++) {
      if (isValid(board, i, j, num)) {
        board[i][j] = num;

        const idx = i * 9 + j;
        const cell = inputs[idx];
        cell.value = num;
        cell.classList.add("correct");
        await sleep(0.1);

        if (await helper(i, j + 1)) return true;

        board[i][j] = 0;
        cell.value = "";
        cell.classList.remove("correct");
        await sleep(0.1);
      }
    }
    return false;
  }

  await helper(0, 0);
  isSolving = false;
}

window.onload = generateBoard;
