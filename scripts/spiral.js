var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")


const width = window.innerWidth
const height = window.innerHeight

canvas.width = width
canvas.height = height

const circle = (x, y, r) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
}

// x - start, i - phase angle, w - phase bias, end - end of frame, scl - scale axis, lnt - length of spiral
const rosey = (sp, i, w, scl, lnt) => sp + scl * (i * lnt) * Math.sin((i * lnt) + w)

const rosex = (sp, i, w, scl, lnt) => sp + scl * (i * lnt) * Math.cos((i * lnt) + w)

let x = width / 2
let y = height / 2
let end = 2 * Math.PI
let scl = 15

// ctx.globalCompositeOperation = 'lighten'
const draw = (w = 0) => {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < end; i += end / 250) {
        // `hsla(${Math.round((i / (Math.PI)) * 360)},50%,50%,100%)`
        ctx.strokeStyle = "#90FFFF40"
        circle(rosey(x, i, w, scl, 2), rosex(y, i, 0, scl, 2), 1.75 * scl * i)
    }
}

draw()
let i = 0
setInterval(() => draw(i += 1 / 60), 1000 / 60);

