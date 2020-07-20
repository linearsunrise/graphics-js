var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")

const width = window.innerWidth
const height = window.innerHeight

canvas.width = width
canvas.height = height

const circle = (x, y, r, color) => {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
}

const clearFrame = () => {
    ctx.clearRect(0, 0, width, height);
}

const clip = (x) => (x >= - 1 && x < 1) ? x : x < -1 ? -1 : 1;
const tri = (x) => 2 * Math.asin(Math.sin(x)) / Math.PI;
const xAxis = (x) => tri(x + Math.PI / 2) * Math.sin(Math.PI / 3);
const yAxis = (x) => clip(2 * tri(x) - 1) * 3 / 4 - 1 / 4 + Math.sin(Math.PI / 6);

const curveX = (x, w, pos, scl) => pos + scl * (xAxis(2 * Math.PI * x + w) + Math.sin(Math.floor(x) * Math.PI / 3));
const curveY = (x, w, pos, scl) => pos + scl * (yAxis(2 * Math.PI * x + w) + Math.cos(Math.floor(x) * Math.PI / 3));

let x = width / 2;
let y = height / 2;
let end = 2 * Math.PI;
let scl = 100;

const draw = (w = 0) => {
    clearFrame();
    for (let i = 0; i < end; i += end / 500) {
        circle(curveX(i, w, x, -scl), curveY(i, 0, y, -scl), 1, `hsla(${Math.round((i / (Math.PI)) * 360)},50%,50%,100%)`);
        circle(curveX(i, w, x, scl), curveY(i, 0, y, scl), 1, `hsla(${Math.round((i / (Math.PI)) * 360)},50%,50%,100%)`);
    }
};

draw();
let i = 0;
setInterval(() => draw(i += 1 / 60), 1000 / 60);