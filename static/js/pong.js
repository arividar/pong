let canvas = document.getElementById("skjarinn");
let ctx = canvas.getContext("2d");

const drawBall = (x, y, r) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();    
}

let x = canvas.width/2;
let y = canvas.height-60;
let r = 10;
let rd = 1;

const draw = () => {
    drawBall(x, y, r);
    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
