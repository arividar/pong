let canvas = document.getElementById("skjarinn");
let ctx = canvas.getContext("2d");

const draw = () => {
    // Do something;
    requestAnimationFrame(draw);

}

requestAnimationFrame(draw);