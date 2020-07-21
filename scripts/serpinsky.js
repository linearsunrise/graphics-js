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
let scl = width / 4;

const polygon = (a) => {
    const matr = Array.from(Array(a).keys());
    const init = matr.map(
        (n) => [
            -Math.sin(2 * n / matr.length * Math.PI) * scl + x,
            -Math.cos(2 * n / matr.length * Math.PI) * scl + y]
    );
    return init;
}

const findHalf = ([[x1, y1], [x2, y2]], ch = 0) => {
    if (ch === 0) {
        return [(x2 + x1) / 2, (y2 + y1) / 2]
    } else {
        return [(x2 - x1) / 2 + x, (y2 - y1) / 2 + y]
    }
};


let angles = 5;
let state = 0;
let points = polygon(angles);
let couples = points;
let j

const draw = (w = 0) => {
    // clearFrame()
    for (let i = 0; i < 3000; i++) {
        j = Math.floor(Math.random() * points.length);
        couples = [findHalf(couples, state), points[j]];
        circle(couples[0], 1);
    }
}

draw();
let i = 0;
setInterval(() => draw(i += 60 / 1000), 1000 / 60);

document.addEventListener('keyup', (e) => {
    ctx.fillStyle = '#202020';
    ctx.fillRect(0, 0, width, height);
    switch (e.keyCode) {
        case 38:
            angles++;
            break;
        case 40:
            angles > 3 ? angles-- : angles = 3;
            break;
        case 39:
            state = 0;
            break;
        case 37:
            state = 1;
            break;
    }
    console.log('amount of points is: ', angles)
    points = polygon(angles);
})
