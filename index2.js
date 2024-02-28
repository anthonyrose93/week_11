let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
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
    document.getElementById('turn').textContent = `${currentPlayer}'s Turn`;
}

function checkWin() {
    console.log("checking for the win")
    const winningPatterns = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],
        [0, 5, 10, 15],
        [12, 9, 6, 3],
    ]

    for (const pattern of winningPatterns) {
        const [a, b, c, d] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c] && board[a] === board[d]) {
        announceWinner(`${currentPlayer} wins!`)
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
    board = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
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