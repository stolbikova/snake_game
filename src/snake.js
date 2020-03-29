import { getRandomInt, dist } from "./utils"

export default function Snake({ 
     width,
     height,
     ctx,
     scl,
}) {
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

    this.isSuccess = function (food) {
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

    const isValid = (val) => {
        return val < width - scl && val > 0
    }
}