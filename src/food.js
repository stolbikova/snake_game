
import { getRandomInt, getMax } from "./utils"

export default function Food({ range, scl }) {
    this.x = getRandomInt(range, scl)
    this.y = getRandomInt(range, scl)

    this.setCoords = function() {
        this.x = getRandomInt(range, scl)
        this.y = getRandomInt(range, scl)
    }
}