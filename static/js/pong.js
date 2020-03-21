"use strict";

let canvas = document.getElementById("skjarinn");
let ctx = canvas.getContext("2d");

const barHeight = 20;
const barWidth = 140;
const ballR = 10;
const ballSpeed = 3;
const barSpeed = 10;

let leftKeyPressed=false;
let rightKeyPressed=false;

let isPaused;
let isGameOver;
let ballX;
let ballY;
let dx;
let dy;
let barX;

const startNewGame = () => {
  barX = canvas.width / 2 - barWidth / 2;
  ballX = barX + Math.floor(Math.random() * barWidth);
  ballY = canvas.height - barHeight - ballR - 1;
  dx = Math.random() > 0.5 ? ballSpeed : -ballSpeed;
  dy = -ballSpeed;
  isGameOver = false;
  isPaused = false;
  drawBar();
  drawBall();
  requestAnimationFrame(draw);
}

const restartGame = () => {
  clearBar();
  clearBall();
  startNewGame();
}

const tick = () => {
  const snd = new Audio("static/media/tick.mp3");
  snd.volume = 0.2;
  snd.play();
};

const beep = () => {
  const snd = new Audio("static/media/button-16.wav");
  snd.volume = 0.2;
  snd.play();
};

const gameOver = () => {
  isGameOver = true;
  isPaused = true;
  const snd = new Audio("static/media/Funny-game-over-sound.mp3");
  snd.volume = 0.3;
  snd.play();
};

const clearBall = () =>
  ctx.clearRect(ballX - ballR * 2, ballY - ballR * 2, ballX + ballR * 2, ballY + ballR * 2);

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
  ballX += dx;
  ballY += dy;
  drawBall();

  if (ballY + ballR >= canvas.height) {
    gameOver();
    return;
  }
  
  if (ballX >= canvas.width - ballR || ballX <= ballR) {
    dx = -dx;
    tick();
  }

  if (ballY <= ballR) {
    dy = -dy;
    tick();
  }

  if (
    ballX >= barX &&
    ballX <= barX + barWidth &&
    ballY + ballR >= canvas.height - barHeight
  ) {
    dy = -ballSpeed;
    beep();
  }

  if (leftKeyPressed) {
    clearBar(barX);
    barX -= barSpeed;
  }
  if (rightKeyPressed) {
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
    if (event.keyCode === 32) {
      if (isGameOver)
        restartGame();
      else
        isPaused = !isPaused;
    }
  },
  false
);

startNewGame();

