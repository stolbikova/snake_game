import Snake from './snake.js'
import Food from './food.js'

//Constants
const width = 50, height = 50
const speedCoef = 1.1
const scl = 1

let renderFreq

// objects
let food
let snake

let ctx
let score
let procId


window.onload = function init() {
    console.log('Snake game');
    const canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    document.addEventListener("keydown", onKeyDown);

    score = 0

    snake = new Snake({ width, height, ctx, scl });
    food = new Food({ width, height });

    food.setCoords();

    renderFreq = 4
    procId = setInterval(draw, 1000 / renderFreq);
}

function setScore() {
    score++
    
    const scoreEl = document.getElementById("score");
    scoreEl.innerHTML = `Score: ${score}`
}

function draw() {
    console.log('draw')

    //background
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);

    // food
    ctx.fillStyle = "#cd0000";
    ctx.fillRect(food.x, food.y, scl, scl);

    // snake
    snake.update()
    snake.show()
    if (snake.isDead()) {
        console.log('Game over')
        stopDraw()
    }
    if (snake.isSuccess(food)) {
        setDraw()
        setScore()
        food.setCoords()
        snake.size ++ 
    }
}

/*
    setDraw - Set new frequency of draw
*/
function setDraw() {
    renderFreq *= speedCoef

    clearInterval(procId);
    procId = setInterval(draw, 1000 / renderFreq);
}

/*
    stopDraw - Stop the draw if game is over
*/
function stopDraw() {
    clearInterval(procId);
}

function onKeyDown(e) {
    const data = {
        'ArrowUp': { x: 0, y: -1 },
        'ArrowDown': { x: 0, y: 1 },
        'ArrowLeft': { x: -1, y: 0 },
        'ArrowRight': { x: 1, y: 0 },
    }

    const coords = data[event.code]

    if (coords && !isBackward(coords)) {
        snake.setDir(coords)
    }
}

/*
    isBackward -  Check if snake moves towards itself
    params - speed direction to x and y
    return - true - if snake moves towards itsels, false - if does not.
*/
function isBackward(params) {
    if (snake.size === 0) {
        return false
    }
    
    const { x, y }  = params

    return (snake.vx === x && snake.vy === -y) ||
        (snake.vx === -x && snake.vy === -y)
}

