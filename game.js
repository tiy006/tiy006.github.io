document.addEventListener('DOMContentLoaded', function() {
    var clickButton = document.getElementById('click-button');
    var scoreDisplay = document.getElementById('score');
    var messageDisplay = document.getElementById('message');
    var score = 0;
    var timeLimit = 10; // 游戏时间限制为10秒
    var gameActive = false;

    clickButton.addEventListener('click', function() {
        if (gameActive) {
            score++;
            scoreDisplay.textContent = score;
        }
    });

    function startGame() {
        score = 0;
        scoreDisplay.textContent = score;
        messageDisplay.textContent = '';
        gameActive = true;
        setTimeout(endGame, timeLimit * 1000);
    }

    function endGame() {
        gameActive = false;
        messageDisplay.textContent = 'Time\'s up! Your score is ' + score + '.';
    }

    startGame(); // 页面加载时开始游戏
});
