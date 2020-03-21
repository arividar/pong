"use strict";

let canvas = document.getElementById("skjarinn");
let ctx = canvas.getContext("2d");

const barHeight = 20;
const barWidth = 140;
const ballR = 10;
const barSpeed = 8;

let leftKeyPressed = false;
let rightKeyPressed = false;

let isPaused;
let isGameOver;
let ballX;
let ballY;
let ballDirectionX;
let ballDirectionY;
let barX;
let ballSpeed;

const startNewGame = () => {
  barX = canvas.width / 2 - barWidth / 2;
  ballX = barX + Math.floor(Math.random() * barWidth);
  ballY = canvas.height - barHeight - ballR - 1;
  ballSpeed = 2;
  ballDirectionX = Math.random() > 0.5 ? 1 : -1;
  ballDirectionY = -1;
  isGameOver = false;
  isPaused = false;
  drawBar();
  drawBall();
  requestAnimationFrame(draw);
};

const restartGame = () => {
  clearBar();
  clearBall();
  startNewGame();
};

const playSound = (soundFile, volume) => {
  const snd = new Audio(soundFile);
  snd.volume = volume;
  snd.play();
}

const playTick = () => playSound("static/media/tick.mp3", 0.2);
const playBeep = () => playSound("static/media/button-16.wav", 0.2);
const playGameOver = () => playSound("static/media/Funny-game-over-sound.mp3", 0.3);

const gameOver = () => {
  ballY = canvas.height - ballR;
  drawBar();
  drawBall();
  isGameOver = true;
  isPaused = true;
  playGameOver();
};

const clearBall = () =>
  ctx.clearRect(
    ballX - ballR * 2,
    ballY - ballR * 2,
    ballX + ballR * 2,
    ballY + ballR * 2
  );

const drawBall = () => {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballR, 0, Math.PI * 2);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
};

const clearBar = () =>
  ctx.clearRect(barX, canvas.height - barHeight, barWidth, barHeight);

const drawBar = () => {
  ctx.fillStyle = "black";
  ctx.fillRect(barX, canvas.height - barHeight, barWidth, barHeight);
};

const draw = () => {
  if (isPaused || isGameOver) {
    requestAnimationFrame(draw);
    return;
  }
  clearBall();

  ballX += ballDirectionX * ballSpeed;
  ballY += ballDirectionY * ballSpeed;

  if (ballY + ballR >= canvas.height) {
    gameOver();
    return;
  }

  drawBall();

  if (ballX >= canvas.width - ballR || ballX <= ballR) {
    ballDirectionX = -ballDirectionX;
    playTick();
  }

  if (ballY <= ballR) {
    ballDirectionY = -ballDirectionY;
    playTick();
  }

  if (
    ballX + ballR >= barX &&
    ballX - ballR <= barX + barWidth &&
    ballY + ballR >= canvas.height - barHeight
  ) {
    ballDirectionY = -ballDirectionY;
    ballSpeed++;
    playBeep();
  }

  if (leftKeyPressed && barX > 0) {
    clearBar(barX);
    barX -= barSpeed;
  }
  if (rightKeyPressed && barX < canvas.width - barWidth) {
    clearBar(barX);
    barX += barSpeed;
  }

  drawBar();
  requestAnimationFrame(draw);
};

document.addEventListener(
  "keyup",
  event => {
    if (event.keyCode === 37) leftKeyPressed = false;
    if (event.keyCode === 39) rightKeyPressed = false;
  },
  false
);

document.addEventListener(
  "keydown",
  event => {
    leftKeyPressed = event.keyCode === 37;
    rightKeyPressed = event.keyCode === 39;
    if (event.keyCode === 32)
      isGameOver ? restartGame() : (isPaused = !isPaused);
  },
  false
);

startNewGame();
