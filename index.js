//Constants
const width = 50, height = 50
const speedCoef = 1.4
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

    snake = new Snake();
    food = new Food();

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
    if (snake.isSuccess()) {
        setDraw()
        setScore()
        food.setCoords()
        snake.size ++ 
    }
}

function setDraw() {
    renderFreq *= speedCoef

    clearInterval(procId);
    procId = setInterval(draw, 1000 / renderFreq);
}

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

    if (coords) {
        snake.setDir(coords)
    }
}

function Food() {
    this.x = getRandomInt(1, width - 1)
    this.y = getRandomInt(1, height - 1)

    this.setCoords = function() {
        this.x = getRandomInt(1, width - 1)
        this.y = getRandomInt(1, height - 1)
    }
}

function Snake() {
    this.x = getRandomInt(1, width - 1);
    this.y = getRandomInt(1, height - 1);
    this.vx = 0;
    this.vy = 1;
    this.size = 0;
    this.tails = [];

    this.setDir = function (coords) {
        const {x, y} = coords;
        
        this.vx = x;
        this.vy = y;
    }

    this.update = function () {        
        if (this.size === this.tails.length) {        
            for (let i = 0; i < this.tails.length - 1; i++) {
                this.tails[i] = this.tails[i+1]
            }
        }
        this.tails[this.size - 1] = {
            x: this.x,
            y: this.y,
        }

        this.x = this.x + this.vx*scl
        this.y = this.y + this.vy*scl

        console.log('snake', this.x, this.y)
    }

    this.show = function () {
        ctx.fillStyle = "#fff";

        // tails
        for (let i = 0; i < this.tails.length; i++) {
            drawSnakeTail(i);
        }
        
        //main part
        ctx.fillRect(this.x, this.y, scl, scl);
    }

    this.isSuccess = function () {
        if(dist(this.x, this.y, food.x,  food.y) < 1) {
            return true
        }

        return false
    }

    this.isDead = function () {
        if(!isValid(this.x) || !isValid(this.y)) {
            return true
        }

        for(let i = 0; i < this.tails.length; i++) {
            const tail = this.tails[i]

            if (tail.x === this.x && tail.y === this.y) {
                return true
            }
        }

        return false
    }

    const drawSnakeTail = (i) => {
        const tail = this.tails[i]
    
        ctx.fillRect(tail.x, tail.y, scl, scl);
    }
}

// utils 
function isValid(val) {
    return val < width - scl && val > 0
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function dist(x1, y1, x2, y2) {
    const a = x1 - x2;
    const b = y1 - y2;

    return Math.sqrt( a*a + b*b );
}