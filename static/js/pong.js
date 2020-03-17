let canvas = document.getElementById("skjarinn");
let ctx = canvas.getContext("2d");

const drawBall = (x, y, r) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
};

let x = canvas.width / 2;
let y = canvas.height - 60;
let r = 10;
let dx = 2;
let dy = -2;

const draw = () => {
  ctx.clearRect(x-r*2, y-r*2, x+r*2, y+r*2);
  drawBall(x, y, r);
  x += dx;
  y += dy;

  if (x >= canvas.width - r || x <= r) {
    dx = -dx;
  }

  if (y <= r || y >= canvas.height - r) dy = -dy;

  requestAnimationFrame(draw);
};

requestAnimationFrame(draw);
