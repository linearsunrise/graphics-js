var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")


const width = window.innerWidth
const height = window.innerHeight

canvas.width = width
canvas.height = height

const circle = (x, y, r) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
}

// x - start, i - phase angle, w - phase bias, end - end of frame, scl - scale axis, lnt - length of spiral
const rosey = (sp, i, w, scl, lnt) => sp + scl * Math.sin((i * lnt) + w)

const rosex = (sp, i, w, scl, lnt) => sp + scl * Math.cos((i * lnt) + w)

let x = width / 2
let y = height / 2
let end = 2 * Math.PI
let scl = 40

ctx.globalCompositeOperation = 'overlay'
const draw = (w = 0) => {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < end; i += end / 70) {
        ctx.fillStyle = `hsla(${Math.round((i / (Math.PI)) * 360)},50%,50%,100%)`
        circle(rosey(x, i, w, 4*scl^2, 2), rosex(y, i, 0, 4*scl^2, 2), 4 * (scl))
    }
}

draw()
let i = 0
setInterval(() => draw(i += 24/1000), 1000 / 60);
