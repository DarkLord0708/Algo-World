const rows = 10;
const cols = 10;
let grid = [];
let visited = [];

const gridContainer = document.getElementById("grid-container");
const islandCountEl = document.getElementById("island-count");

function generateRandomGrid() {
  grid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Math.random() > 0.6 ? 1 : 0)
  );
  visited = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  );
  drawGrid();
  islandCountEl.textContent = "Islands: 0";
}

function drawGrid() {
  gridContainer.innerHTML = "";
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (grid[i][j] === 1) {
        cell.classList.add("land");
      }
      cell.setAttribute("data-i", i);
      cell.setAttribute("data-j", j);
      gridContainer.appendChild(cell);
    }
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function dfs(i, j) {
  if (
    i < 0 || j < 0 || i >= rows || j >= cols ||
    visited[i][j] || grid[i][j] === 0
  ) return;

  visited[i][j] = true;
  markVisited(i, j);

  await delay(120); // ⬅ Slower animation speed

  await dfs(i + 1, j);
  await dfs(i - 1, j);
  await dfs(i, j + 1);
  await dfs(i, j - 1);
}

function markVisited(i, j) {
  const cells = document.querySelectorAll(".cell");
  const index = i * cols + j;
  if (cells[index]) {
    cells[index].classList.add("visited");
  }
}

async function visualizeIslands() {
  let count = 0;
  visited = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  );

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 1 && !visited[i][j]) {
        await dfs(i, j);
        count++;
        islandCountEl.textContent = `Islands: ${count}`;
      }
    }
  }
}

// ✅ Automatically generate a grid on page load
window.onload = () => {
  generateRandomGrid();
};
