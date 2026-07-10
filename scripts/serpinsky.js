var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")


const width = window.innerWidth
const height = window.innerHeight

canvas.width = width
canvas.height = height

const circle = ([x, y], r) => {
    ctx.fillStyle = "#FFFFFFC0";
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
}

const clearFrame = (amount) => {
    // ctx.clearRect(0, 0, width, height);
    ctx.save();
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = `rgba(0, 0, 0, ${amount})`; // e.g., 0.1 to fade out 10%
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.restore();
    
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
let pattern = 0;
let points = polygon(angles);
let couples = points;
let j

const draw = (w = 0) => {
    clearFrame(0.02)
    for (let i = 0; i < 3000; i++) {
        j = Math.floor(Math.random() * points.length);
        couples = [findHalf(couples, pattern), points[j]];
        circle(couples[0], 1);
    }
}

draw();
let i = 0;
setInterval(() => draw(i += 60 / 1000), 1000 / 60);

document.addEventListener('keyup', (e) => {
    clearFrame(1)

    switch (e.keyCode) {
        case 38:
            angles++;
            break;
        case 40:
            angles > 3 ? angles-- : angles = 3;
            break;
        case 39:
            pattern = 0;
            break;
        case 37:
            pattern = 1;
            break;
    }
    points = polygon(angles);
})
