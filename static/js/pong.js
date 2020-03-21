'use strict'

const barHeight = 20;
const barWidth = 140;
const ballR = 10;
const barSpeed = 10;
let canvas = document.getElementById("skjarinn");
let ctx = canvas.getContext("2d");

let ballX = canvas.width / 2;
let ballY = canvas.height - 60;
let dx = 3;
let dy = 3;
let barX = canvas.width / 2 - barWidth / 2;

const clearBall = (x, y, r) =>
  ctx.clearRect(x - r * 2, y - r * 2, x + r * 2, y + r * 2);

const drawBall = (x, y, r) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
};

const clearBar = x => ctx.clearRect(x, canvas.height - barHeight, barWidth, barHeight);

const drawBar = x => {
  ctx.fillStyle = "black";
  ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
};

const draw = () => {

  clearBall(ballX, ballY, ballR);
  ballX += dx;
  ballY += dy;
  drawBall(ballX, ballY, ballR);

  if (ballX >= canvas.width - ballR || ballX <= ballR) dx = -dx;
  if (ballY <= ballR || ballY >= canvas.height - ballR) dy = -dy;
  

  let newBarX = barX;
  document.onkeydown = function(event) {
    switch (event.keyCode) {
       case 37: // left
          newBarX = barX - barSpeed;
          break;
        case 39: // right
          newBarX = barX + barSpeed;
          break;
       case 38: // up
       case 40: // down
    }
    if (newBarX !== barX) {
      clearBar(barX);
      barX = newBarX;
      drawBar(barX);
    }
  }
  drawBar(barX);
  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

