
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const {
    width, height
} = canvas;

const length = 16;
const amp = 16;

const fun1 = (x, t) => Math.sin(x / length) * t * amp;
const fun2 = (x, t) => Math.cos(x / length) * t * amp;

let currentFn = 0;

const pointFns = [
    (i, engine) => [width / 2 + fun2(i + engine, Math.sin(i + engine) * i / width * amp), width / 2 + fun1(i + engine, Math.sin(i + engine) * i / width * amp)],
    (i, engine) => [width / 2 + fun2(i + engine, Math.sin(i + engine) * i / width * amp), width / 2 + fun1(i + engine, Math.sin(i) * i / width * amp)],
    (i, engine) => [width / 2 + fun2(i + engine, Math.sin(i + engine) * i / width * amp), width / 2 + fun1(i, Math.sin(i + engine) * i / width * amp)],
    (i, engine) => [width / 2 + fun2(i + engine, Math.sin(i + engine) * i / width * amp), width / 2 + fun1(i, Math.sin(i) * i / width * amp)],
    (i, engine) => [width / 2 + fun2(i + engine, Math.sin(i) * i / width * amp), width / 2 + fun1(i + engine, Math.sin(i + engine) * i / width * amp)],
    (i, engine) => [width / 2 + fun2(i + engine, Math.sin(i) * i / width * amp), width / 2 + fun1(i + engine, Math.sin(i) * i / width * amp)],
    (i, engine) => [width / 2 + fun2(i + engine, Math.sin(i) * i / width * amp), width / 2 + fun1(i, Math.sin(i + engine) * i / width * amp)],
    (i, engine) => [width / 2 + fun2(i + engine, Math.sin(i) * i / width * amp), width / 2 + fun1(i, Math.sin(i) * i / width * amp)],
    (i, engine) => [width / 2 + fun2(i, Math.sin(i + engine) * i / width * amp), width / 2 + fun1(i + engine, Math.sin(i + engine) * i / width * amp)],
    (i, engine) => [width / 2 + fun2(i, Math.sin(i + engine) * i / width * amp), width / 2 + fun1(i + engine, Math.sin(i) * i / width * amp)],
    (i, engine) => [width / 2 + fun2(i, Math.sin(i + engine) * i / width * amp), width / 2 + fun1(i, Math.sin(i + engine) * i / width * amp)],
    (i, engine) => [width / 2 + fun2(i, Math.sin(i + engine) * i / width * amp), width / 2 + fun1(i, Math.sin(i) * i / width * amp)],
    (i, engine) => [width / 2 + fun2(i, Math.sin(i) * i / width * amp), width / 2 + fun1(i + engine, Math.sin(i + engine) * i / width * amp)],
    (i, engine) => [width / 2 + fun2(i, Math.sin(i) * i / width * amp), width / 2 + fun1(i + engine, Math.sin(i) * i / width * amp)],
    (i, engine) => [width / 2 + fun2(i, Math.sin(i) * i / width * amp), width / 2 + fun1(i, Math.sin(i + engine) * i / width * amp)],
    (i, engine) => [width / 2 + fun2(i, Math.sin(i) * i / width * amp), width / 2 + fun1(i, Math.sin(i) * i / width * amp)],
];

const render = (engine = 0) => {
    // console.log(engine);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'black';
    for (let i = 0; i < width; i += 0.02) {
        ctx.fillRect(...pointFns[currentFn](i, engine), 1, 1);
    }
};

const swap = () => {
    currentFn = (currentFn + 1) % pointFns.length;
}

render();
let i = 0;
setInterval(() => render(i += 0.1), 1);