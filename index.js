let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(event) {
    if (!gameActive) return;

    const cell = event.target;
    const index = cell.dataset.index;

    if (board[index] === '') {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        checkWin();
        checkDraw();
        togglePlayer();
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById ('turn').textContent = `${currentPlayer}'s Turn`;
}

function checkWin() {
    const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            announceWinner(`${currentPlayer} wins!`);
            return;
        }
    }
}

function checkDraw () {
    if (!board.includes('')) {
        announceWinner('It\'s a draw!')
    }
}

function announceWinner(message) {
    gameActive = false;
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-primary mt-3';
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
}

function restartGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', '']
    gameActive = true;

    const cells = document.querySelectorAll ('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
    });

    const alertDiv = document.querySelector('.alert');
    if (alertDiv) {
        alertDiv.remove();
    }

    document.getElementById ('turn').textContent = `${currentPlayer}'s Turn`;
}