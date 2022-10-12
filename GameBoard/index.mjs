


class GameBoard {
    constructor(dimensions) {
        this.width = dimensions.width
        this.height = dimensions.height
        this.boardObjects = []
    }

    updateBoardObject (data) {
        // data should have Object Identifier and data
    }

    addBoardObject (gameObject) {
        const objects = this.boardObjects.slice()
        objects[objects.length] = gameObject
        this.boardObjects = objects
        return gameObject
    }
}

export { GameBoard }
