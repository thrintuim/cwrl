
// The single responsibility of the GameBoard is to track the position of objects on the board

class GameBoard {
    constructor(dimensions) {
        this.width = dimensions.width
        this.height = dimensions.height
        this.boardObjects = []
        this.entryPoints = [{x:50, y:0}, {x:50, y:100}]
    }

    moveObject (data) {
        // data should have Object Identifier and data
    }

    addObject (gameObject) {
        const objects = this.boardObjects.slice()
        gameObject = Object.assign({}, gameObject, this.entryPoints[objects.length])
        objects[objects.length] = gameObject
        this.boardObjects = objects
        return gameObject
    }
}

export { GameBoard }
