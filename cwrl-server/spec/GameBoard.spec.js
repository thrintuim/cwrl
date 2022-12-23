/*
Things to do with the 0.0.1 version of CWRL
    1. Create a game board
    2. No objects should be on the game board initially
    3. A game board can have objects added to it
    4. Game board tracks the position of those objects
    5. Objects are moved by updating the object on the gameboard
*/


import GameBoard from '../GameBoard/index.mjs'


describe('GameBoard object instantiation', () => {
    const gb = new GameBoard({width: 100, height: 100})
    it("should have the height and width specified", () => {
        expect(gb.width).toBe(100)
        expect(gb.height).toBe(100)
    })
    it("should have no objects on the game board", () => {
        expect(gb.boardObjects.length).toBe(0)
    })
    
})

describe('GameBoard add object method', () => {
    const gb = new GameBoard({width:100, height: 100})
    gb.entryPoints = []
    const go = {}
    const newObject = gb.addObject(go)
    it("Should add the board object to the board objects property", () => {
        expect(gb.boardObjects[0]).toEqual(go)
        expect(gb.boardObjects.length).toBe(1)
    })
    it("should return the added board object", () => {
        expect(newObject).toEqual(go)
    })
    
})

describe('Gameboard move object method', () => {
    const gb = new GameBoard({width: 100, height: 100})
    const go = {}
    const newObject = gb.addObject(go)
    const boardState = gb.moveObject(go, {x:20, y:20})

    it("should return a board state that reflects that the object has moved", () => {
        expect(boardState[0].x).toBe(20)
        expect(boardState[0].y).toBe(20)
    })

    it("should also adjust the element in the boardObjects array", () => {
        expect(gb.boardObjects[0].x).toBe(20)
        expect(gb.boardObjects[0].y).toBe(20)
    })
})