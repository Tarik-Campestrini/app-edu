
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;

let playerScore = 0;
let opponentScore = 0;

let playerY = (canvas.height - paddleHeight) / 2;
let opponentY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 3;
let ballSpeedY = 3;
let colors = ['#FF6347', '#FFD700', '#ADFF2F', '#87CEEB', '#EE82EE'];
let gameTime = 0;

let gameOver = false;  // Variável para verificar o estado do jogo

const playerX = 30; // Ajusta a posição inicial do jogador
const opponentX = canvas.width - paddleWidth - 30; // Ajusta a posição inicial do oponente

document.addEventListener("keydown", keyDownHandler);

function keyDownHandler(event) {
    if (event.key === "ArrowUp") {
        playerY -= 20;
    } else if (event.key === "ArrowDown") {
        playerY += 20;
    }

    // Impede que a raquete do jogador saia dos limites superiores/inferiores
    if (playerY < 0) {
        playerY = 0;
    } else if (playerY + paddleHeight > canvas.height) {
        playerY = canvas.height - paddleHeight;
    }
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = Math.sign(ballSpeedX) * 3; // Reseta a velocidade da bola
    ballSpeedY = Math.sign(ballSpeedY) * 3; // Reseta a velocidade da bola
}

function changeBackgroundColor() {
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.getElementById("main").style.backgroundColor = randomColor;
    document.getElementById("gameCanvas").style.borderColor = randomColor;
}

function updateScoreboard() {
    document.getElementById('playerScore').innerText = `Jogador: ${playerScore}`;
    document.getElementById('opponentScore').innerText = `Oponente: ${opponentScore}`;
}

function updateGameTime() {
    gameTime += 1;
    document.getElementById('gameTime').innerText = `Tempo de jogo: ${gameTime}s`;
}

function increaseBallSpeed() {
    ballSpeedX *= 1.5;
    ballSpeedY *= 1.5;
}

function showGameOver(winner) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Game Over! ${winner} venceu!`, canvas.width / 2, canvas.height / 2);
    gameOver = true; // Define o estado do jogo como "game over"
}

function checkGameOver() {
    if (playerScore >= 10 || opponentScore >= 10) {
        showGameOver(playerScore >= 10 ? 'Jogador' : 'Oponente');
    }
}

function draw() {
    if (gameOver) return; // Para de desenhar se o jogo acabou

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha o jogador
    ctx.fillStyle = '#0000FF';
    ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);

    // Desenha o oponente
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(opponentX, opponentY, paddleWidth, paddleHeight);

    // Desenha a bola
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fill();

    // Movimenta a bola
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Colisão da bola com a parede superior/inferior
    if (ballY + ballSize > canvas.height || ballY - ballSize < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Colisão da bola com o jogador
    if (ballX - ballSize < playerX + paddleWidth && ballY > playerY && ballY < playerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Colisão da bola com o oponente
    if (ballX + ballSize > opponentX && ballY > opponentY && ballY < opponentY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Ponto para o oponente
    if (ballX - ballSize < 0) {
        opponentScore++;
        resetBall();
        changeBackgroundColor();
        updateScoreboard();
        checkGameOver();
    }

    // Ponto para o jogador
    if (ballX + ballSize > canvas.width) {
        playerScore++;
        resetBall();
        changeBackgroundColor();
        updateScoreboard();
        checkGameOver();
    }

    // Movimenta o oponente
    if (ballY > opponentY + paddleHeight / 2) {
        opponentY += 2;
    } else if (ballY < opponentY + paddleHeight / 2) {
        opponentY -= 2;
    }

    // Impede que a raquete do oponente saia dos limites superiores/inferiores
    if (opponentY < 0) {
        opponentY = 0;
    } else if (opponentY + paddleHeight > canvas.height) {
        opponentY = canvas.height - paddleHeight;
    }
}

setInterval(draw, 20);
setInterval(increaseBallSpeed, 20000); // Aumenta a velocidade da bola a cada 20 segundos
setInterval(updateGameTime, 1000); // Atualiza o tempo de jogo a cada segundo

