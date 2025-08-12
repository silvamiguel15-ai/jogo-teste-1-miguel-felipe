const circle = document.getElementById("circle");
const obstacle = document.getElementById("obstacle");
const gameOver = document.getElementById("game-over");

let circleBottom = 20; // Posição inicial do círculo
let isJumping = false;
let obstaclePosition = window.innerWidth; // Início da posição do obstáculo

document.addEventListener("keydown", jump);

function jump(e) {
    if (e.code === "Space" && !isJumping) {
        isJumping = true;
        let jumpHeight = 0;
        const jumpInterval = setInterval(() => {
            if (jumpHeight >= 150) {
                clearInterval(jumpInterval);
                const fallInterval = setInterval(() => {
                    if (circleBottom <= 20) {
                        clearInterval(fallInterval);
                        isJumping = false;
                    }
                    circleBottom -= 10;
                    circle.style.bottom = `${circleBottom}px`;
                }, 20);
            }
            circleBottom += 10;
            circle.style.bottom = `${circleBottom}px`;
            jumpHeight += 10;
        }, 20);
    }
}

function moveObstacle() {
    obstaclePosition -= 5;
    if (obstaclePosition < -40) {
        obstaclePosition = window.innerWidth;
    }
    obstacle.style.left = `${obstaclePosition}px`;
    checkCollision();
}

function checkCollision() {
    if (obstaclePosition >= 50 && obstaclePosition <= 100 && circleBottom <= 60) {
        endGame();
    }
}

function endGame() {
    gameOver.style.display = "block";
    clearInterval(obstacleInterval);
}

function restartGame() {
    gameOver.style.display = "none";
    obstaclePosition = window.innerWidth;
    circleBottom = 20;
    obstacle.style.left = `${obstaclePosition}px`;
    circle.style.bottom = `${circleBottom}px`;
    obstacleInterval = setInterval(moveObstacle, 20);
}

let obstacleInterval = setInterval(moveObstacle, 20);
