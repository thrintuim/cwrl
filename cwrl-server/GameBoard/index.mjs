
// The single responsibility of the GameBoard is to track the position of objects on the board

class GameBoard {
    constructor(dimensions) {
        this.width = dimensions.width
        this.height = dimensions.height
        this.boardObjects = []
        this.entryPoints = [{x:50, y:0}, {x:50, y:100}, {x: 0, y: 50}, {x: 100, y: 50}]
    }

    moveObject (gameObject, data) {
        // data should be an object
        const gameObjectIndex = this.boardObjects.indexOf(gameObject)
        const beforeObject = this.boardObjects.slice(0, gameObjectIndex)
        const afterObject = this.boardObjects.slice(gameObjectIndex + 1)
        const newGameObject = Object.assign({}, gameObject, data)
        const objects = beforeObject.concat([newGameObject], afterObject)
        this.boardObjects = objects
        return this.boardObjects
    }

    addObject (gameObject) {
        const objects = this.boardObjects.slice()
        gameObject = Object.assign({}, gameObject, this.entryPoints[objects.length])
        objects[objects.length] = gameObject
        this.boardObjects = objects
        return gameObject
    }
}

export default GameBoard
