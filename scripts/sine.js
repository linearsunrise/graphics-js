var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")

const width = window.innerWidth
const height = window.innerHeight

canvas.width = width
canvas.height = height

const circle = (x, y, r, color) => {
    ctx.strokeStyle = color
    ctx.fillStyle = color
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
}

const clearFrame = () => {
    ctx.clearRect(0, 0, width, height);
}

const f = (x) => Math.sin(x)
const phase = (x=0) => x

let x = width / 2
let y = height / 2
let end = 6 * Math.PI
let scl = 100

const draw = (w = 0) => {
    clearFrame()
    for (let i = 0; i < end; i += end / 1000) {
        circle(x+20*phase(i), y+20*f(i-w-4*f(i-w)), 1, `hsla(${Math.round((i/(Math.PI))*360)},50%,50%,20%)`)
        circle(x+phase(-4*i), y+20*f(-w-4*f(-w)), 1, "red")
    }
}

draw()
let i = 0
setInterval(() => draw(i += 1/16), 1000 / 60);