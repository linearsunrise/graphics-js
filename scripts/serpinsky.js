var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")


const width = window.innerWidth
const height = window.innerHeight

canvas.width = width
canvas.height = height

const circle = ([x, y], r) => {
    ctx.fillStyle = "#FFFFFF10";
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
}

const clearFrame = () => {
    ctx.clearRect(0, 0, width, height);
}


let x = width / 2;
let y = height / 2;
let scl = 350;
let angles = 5;

const matr = Array.from(Array(angles).keys());

const polygon = matr.map(
    (n) => [
        -Math.sin(2 * n / matr.length * Math.PI) * scl + x,
        -Math.cos(2 * n / matr.length * Math.PI) * scl + y]
);

// const polygon = [
//     [0,0],
//     [0,height],
//     [width,0],
//     [width,height]]

const findHalf = ([[x1, y1], [x2, y2]]) => [(x2 + x1) / 2, (y2 + y1) / 2];
// const findHalf = ([[x1, y1], [x2, y2]]) => [(x2 - x1) / 2 + x, (y2 - y1) / 2 + y]

// polygon.map(([i, j]) => { circle([i, j], 1) });

let couples = polygon;
let j

const draw = (w = 0) => {
    // clearFrame()
    for (let i = 0; i < 3000; i++) {
        j = Math.floor(Math.random() * polygon.length);
        couples = [findHalf(couples), polygon[j]];
        circle(couples[0], 1);
    }
}

draw();
let i = 0;
setInterval(() => draw(i += 60 / 1000), 1000 / 60);
