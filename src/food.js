
import { getRandomInt } from "./utils"

export default function Food({ width, height }) {
    this.x = getRandomInt(1, width - 1)
    this.y = getRandomInt(1, height - 1)

    this.setCoords = function() {
        this.x = getRandomInt(1, width - 1)
        this.y = getRandomInt(1, height - 1)
    }
}