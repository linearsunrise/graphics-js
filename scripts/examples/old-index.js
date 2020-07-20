const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
//       const {
//         width, height
//       } = canvas;
const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

ctx.strokeStyle = '#a1a050';
ctx.fillStyle = '#202020';
ctx.fillRect(0, 0, width, height);


let initDelta = delta = 32;
let ratio = 1;

const init = (count) => {
    let couples = [];
    for (let i = 0; i < count; i++) {
        const couple = [
            [width / 2 + Math.cos(2 * Math.PI * i / count) * delta, height / 2 + Math.sin(2 * Math.PI * i / count) * delta],
            [width / 2 + Math.cos(2 * Math.PI * (i + 1) / count) * delta, height / 2 + Math.sin(2 * Math.PI * (i + 1) / count) * delta]
        ];

        ctx.beginPath();
        ctx.moveTo(couple[0][0], couple[0][1]);
        ctx.lineTo(couple[1][0], couple[1][1]);
        ctx.stroke();

        couples.push(couple);
    }

    return couples;
};

let count = 13;
let couples = init(count);

const render = () => {
    delta *= ratio;

    const _points = [];
    for (let i = 0; i < couples.length; i++) {
        const [A, B] = couples[i];
        const mid = [
            (B[0] + A[0]) / 2, (B[1] + A[1]) / 2
        ];

        const a = B[1] - A[1];
        const b = B[0] - A[0];
        const c = (b > 0 ? -1 : 1) * Math.hypot(a, b);

        const sinAlpha = a / c;
        const Alpha = Math.asin(sinAlpha);
        const angle = Math.PI / 2 - Alpha + (b > 0 ? Math.PI : 0);

        const point1 = [mid[0] + Math.cos(angle) * delta, mid[1] + Math.sin(angle) * delta];
        const point2 = [mid[0] + Math.cos(angle + Math.PI) * delta, mid[1] + Math.sin(angle + Math.PI) * delta];

        _points.push(point1);

        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(A[0], A[1]);
        ctx.lineTo(...point1);
        ctx.lineTo(B[0], B[1]);
        ctx.stroke();

        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(A[0], A[1]);
        ctx.lineTo(...point2);
        ctx.lineTo(B[0], B[1]);
        ctx.stroke();
    }

    couples = [];

    ctx.beginPath();
    ctx.moveTo(_points[0][0], _points[0][1]);

    for (let i = 1; i <= _points.length; i++) {
        ctx.lineTo(..._points[i % _points.length]);
        couples.push([
            _points[i - 1],
            _points[i % _points.length]
        ]);
    }

    ctx.stroke();

}

render();

setInterval(render, 100);


document.addEventListener('keyup', (e) => {
    ctx.fillStyle = '#202020';
    ctx.fillRect(0, 0, width, height);
    delta = initDelta;

    switch (e.keyCode) {
        case 38:
            count++;
            break;
        case 40:
            count--;
            break;
        case 39:
            ratio += 0.01;
            break;
        case 37:
            ratio -= 0.01;
            break;
    }

    couples = init(count);
})