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


let solutionBoard = [];
let currentBoardIndex = 0;


function renderBoard(board) {
  const container = document.getElementById("sudoku-board");
  container.innerHTML = "";

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = document.createElement("input");
      cell.dataset.row = i;
      cell.dataset.col = j;

      cell.addEventListener("mouseover", () => {
        const allCells = document.querySelectorAll(".sudoku-cell");
        allCells.forEach(c => {
          if (c.dataset.row == i || c.dataset.col == j) {
            c.classList.add("highlight");
          }
        });
      });

      cell.addEventListener("mouseout", () => {
        const allCells = document.querySelectorAll(".sudoku-cell");
        allCells.forEach(c => c.classList.remove("highlight"));
      });

      cell.className = "sudoku-cell";
      cell.type = "text";
      cell.maxLength = 1;

      if (board[i][j] !== 0) {
        cell.value = board[i][j];
        cell.disabled = true;
      } else {
        cell.addEventListener("input", function () {
          const val = parseInt(cell.value);
          if (!val || val < 1 || val > 9) {
            cell.classList.remove("correct");
            cell.classList.add("incorrect");
            return;
          }
          if (val === solutionBoard[i][j]) {
            cell.classList.remove("incorrect");
            cell.classList.add("correct");
          } else {
            cell.classList.remove("correct");
            cell.classList.add("incorrect");
          }
        });
      }

      container.appendChild(cell);
    }
  }
}

function solve(board) {
  function isValid(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num || board[x][col] === num) return false;
    }

    const startRow = row - (row % 3), startCol = col - (col % 3);
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (board[i][j] === num) return false;
      }
    }

    return true;
  }

  function solveHelper(board) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, i, j, num)) {
              board[i][j] = num;
              if (solveHelper(board)) return true;
              board[i][j] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  const boardCopy = board.map(row => [...row]);
  solveHelper(boardCopy);
  return boardCopy;
}

function generateBoard() {
  const puzzle = hardcodedBoards[currentBoardIndex];
  currentBoardIndex = (currentBoardIndex + 1) % hardcodedBoards.length;

  // Solve the puzzle and store the solution
  solutionBoard = solve(puzzle);

  renderBoard(puzzle);
}



function clearBoard() {
  const inputs = document.querySelectorAll(".sudoku-cell");
  inputs.forEach(input => {
    if (!input.disabled) {
      input.value = "";
      input.classList.remove("correct", "incorrect");
    }
  });
}

function solveSudoku() {
  const inputs = document.querySelectorAll(".sudoku-cell");
  for (let i = 0; i < 81; i++) {
    const row = Math.floor(i / 9);
    const col = i % 9;
    if (!inputs[i].disabled) {
      inputs[i].value = solutionBoard[row][col];
      inputs[i].classList.add("correct");
    }
  }
}

// Auto-generate board on load
window.onload = generateBoard;

