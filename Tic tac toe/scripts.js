document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const messageElement = document.getElementById("message");
    const restartButton = document.getElementById("restart");

    let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = cell.getAttribute("data-index");

        if (gameState[cellIndex] !== "" || checkWin()) {
            return;
        }

        gameState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin()) {
            messageElement.textContent = `Player ${currentPlayer} wins!`;
            return;
        } else if (isBoardFull()) {
            messageElement.textContent = "It's a draw!";
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    }

    function isBoardFull() {
        return gameState.every(cell => cell !== "");
    }

    function restartGame() {
        gameState = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => (cell.textContent = ""));
        messageElement.textContent = "";
        currentPlayer = "X";
    }

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    restartButton.addEventListener("click", restartGame);
});
