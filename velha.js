// Obtém a referência para o elemento HTML com o id "gameCanvas" e o contexto 2D do canvas.
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Define o tamanho de cada célula no tabuleiro.
const cellSize = 100;

// Inicializa o tabuleiro e outras variáveis do jogo.
let board = [['', '', ''], ['', '', ''], ['', '', '']];
let currentPlayer = 'X'; // Define o jogador atual como 'X'.
let gameOver = false; // Indica se o jogo acabou ou não.

// Obtém a referência para o elemento HTML que exibirá de quem é a vez.
const playerTurnElement = document.getElementById("playerTurn");

// Adiciona um ouvinte de evento para o clique no canvas.
canvas.addEventListener("click", handleCanvasClick);

// Função para atualizar o texto que exibe de quem é a vez.
function updatePlayerTurn() {
    playerTurnElement.textContent = `Vez do Jogador ${currentPlayer}`;
}

// Função para desenhar o tabuleiro no canvas.
function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            const cellValue = board[y][x];
            ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
            ctx.font = "40px Arial";
            ctx.fillText(cellValue, x * cellSize + 35, y * cellSize + 70);
        }
    }
}

// Função para verificar se um movimento é válido em uma posição específica do tabuleiro.
function isValidMove(x, y) {
    return board[y][x] === '';
}

// Função para verificar se há uma vitória após um movimento em uma posição específica.
function checkWin(x, y) {
    // Define as direções nas quais procurar uma linha vencedora.
    const directions = [
        [{ x: -1, y: -1 }, { x: 1, y: 1 }],
        [{ x: -1, y: 0 }, { x: 1, y: 0 }],
        [{ x: -1, y: 1 }, { x: 1, y: -1 }],
        [{ x: 0, y: -1 }, { x: 0, y: 1 }],
    ];

    for (const dirs of directions) {
        const [dir1, dir2] = dirs;
        let count = 1;

        for (const dir of [dir1, dir2]) {
            let cx = x + dir.x;
            let cy = y + dir.y;

            while (board[cy] && board[cy][cx] === currentPlayer) {
                count++;
                cx += dir.x;
                cy += dir.y;
            }
        }

        if (count >= 3) {
            return true; // Há uma linha vencedora.
        }
    }

    return false; // Não há uma linha vencedora.
}

// Função para verificar se o tabuleiro está completamente preenchido (empate).
function isBoardFull() {
    return board.every(row => row.every(cell => cell !== ''));
}

// Função que lida com o clique no canvas.
function handleCanvasClick(event) {
    if (gameOver) return; // Se o jogo já acabou, não faz nada.

    const x = Math.floor(event.offsetX / cellSize);
    const y = Math.floor(event.offsetY / cellSize);

    if (isValidMove(x, y)) {
        board[y][x] = currentPlayer; // Define a célula como pertencente ao jogador atual.
        drawBoard(); // Redesenha o tabuleiro.

        if (checkWin(x, y)) {
            alert(`Jogador ${currentPlayer} ganhou!`); // Exibe uma mensagem de vitória.
            gameOver = true; // Marca o jogo como terminado.
        } else if (isBoardFull()) {
            alert("Empate!"); // Exibe uma mensagem de empate.
            gameOver = true; // Marca o jogo como terminado.
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Alterna para o próximo jogador.
            updatePlayerTurn(); // Atualiza o texto de quem é a vez.
        }
    }
}

// Inicializa o texto de quem é a vez e desenha o tabuleiro vazio.
updatePlayerTurn();
drawBoard();
