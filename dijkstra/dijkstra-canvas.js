
const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");

let nodes = [];
let edges = [];
let adj = {};
let distances = {};
let visited = {};
let nodePositions = [];

const predefinedGraphs = [
    // Small Graph
    {
        nodes: [0, 1, 2, 3, 4],
        nodePositions: [
            { x: 100, y: 100 },
            { x: 300, y: 80 },
            { x: 500, y: 100 },
            { x: 200, y: 300 },
            { x: 400, y: 300 }
        ],
        edges: [
            [0, 1, 4],
            [0, 3, 2],
            [1, 2, 3],
            [3, 1, 1],
            [3, 4, 5],
            [4, 2, 1]
        ]
    },

    // Larger Graph 1
    {
        nodes: [0, 1, 2, 3, 4, 5, 6],
        nodePositions: [
            { x: 100, y: 100 },
            { x: 250, y: 70 },
            { x: 400, y: 100 },
            { x: 100, y: 250 },
            { x: 250, y: 250 },
            { x: 400, y: 250 },
            { x: 250, y: 400 }
        ],
        edges: [
            [0, 1, 2],
            [1, 2, 3],
            [0, 3, 1],
            [1, 4, 2],
            [2, 5, 1],
            [3, 4, 2],
            [4, 5, 3],
            [4, 6, 4],
            [5, 6, 2]
        ]
    },

    // Larger Graph 2
    {
        nodes: [0, 1, 2, 3, 4, 5, 6, 7],
        nodePositions: [
            { x: 100, y: 100 },
            { x: 300, y: 100 },
            { x: 500, y: 100 },
            { x: 100, y: 250 },
            { x: 300, y: 250 },
            { x: 500, y: 250 },
            { x: 200, y: 400 },
            { x: 400, y: 400 }
        ],
        edges: [
            [0, 1, 2],
            [1, 2, 1],
            [0, 3, 3],
            [1, 4, 4],
            [2, 5, 2],
            [3, 4, 1],
            [4, 5, 3],
            [3, 6, 2],
            [4, 6, 2],
            [5, 7, 1],
            [6, 7, 5]
        ]
    },

    // Larger Graph 3
    {
        nodes: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        nodePositions: [
            { x: 80, y: 80 },
            { x: 240, y: 60 },
            { x: 400, y: 80 },
            { x: 80, y: 220 },
            { x: 240, y: 200 },
            { x: 400, y: 220 },
            { x: 120, y: 360 },
            { x: 280, y: 360 },
            { x: 440, y: 360 }
        ],
        edges: [
            [0, 1, 1],
            [1, 2, 2],
            [0, 3, 2],
            [1, 4, 3],
            [2, 5, 1],
            [3, 4, 1],
            [4, 5, 2],
            [3, 6, 3],
            [4, 7, 2],
            [5, 8, 3],
            [6, 7, 2],
            [7, 8, 1]
        ]
    }
];

let currentGraph = 0;

function drawNode(x, y, label, color = "skyblue") {
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, x, y);
}

function drawEdge(x1, y1, x2, y2, weight) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    ctx.fillStyle = "black";
    ctx.font = "14px Arial";
    ctx.fillText(weight, midX, midY - 5);
}

function drawGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let [u, v, w] of edges) {
        const p1 = nodePositions[u];
        const p2 = nodePositions[v];
        drawEdge(p1.x, p1.y, p2.x, p2.y, w);
    }

    for (let i = 0; i < nodes.length; i++) {
        const p = nodePositions[i];
        const label = distances[i] < Infinity ? i + " (" + distances[i] + ")" : i;
        drawNode(p.x, p.y, label, visited[i] ? "#90ee90" : "skyblue");
    }
}

function generateGraph() {
    const graph = predefinedGraphs[currentGraph];
    currentGraph = (currentGraph + 1) % predefinedGraphs.length;

    nodes = graph.nodes;
    edges = graph.edges;
    nodePositions = graph.nodePositions;

    adj = {};
    for (let u of nodes) adj[u] = [];
    for (let [u, v, w] of edges) {
        adj[u].push([v, w]);
        adj[v].push([u, w]);
    }

    distances = {};
    visited = {};
    for (let u of nodes) {
        distances[u] = Infinity;
        visited[u] = false;
    }

    drawGraph();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function animateDot(x1, y1, x2, y2) {
    const steps = 20;
    for (let i = 0; i <= steps; i++) {
        drawGraph();
        const x = x1 + (x2 - x1) * (i / steps);
        const y = y1 + (y2 - y1) * (i / steps);
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
        await sleep(50);
    }
}

async function runDijkstra() {
    const src = 0;
    distances[src] = 0;

    for (let i = 0; i < nodes.length; i++) {
        let u = -1;
        for (let v of nodes) {
            if (!visited[v] && (u === -1 || distances[v] < distances[u])) {
                u = v;
            }
        }

        if (distances[u] === Infinity) break;

        visited[u] = true;
        drawGraph();
        await sleep(400);

        for (let [v, w] of adj[u]) {
            const pu = nodePositions[u];
            const pv = nodePositions[v];
            await animateDot(pu.x, pu.y, pv.x, pv.y);
            if (distances[u] + w < distances[v]) {
                distances[v] = distances[u] + w;
                drawGraph();
            }
        }
    }
    drawGraph();
}

// Initialize the first graph on load
generateGraph();
