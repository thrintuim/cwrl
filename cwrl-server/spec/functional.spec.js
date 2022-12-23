import GameBoard from '../GameBoard/index.mjs'

describe('cwrl 0.0.1 game initialization', () => {
    const gb = new GameBoard( { width: 100, height: 100 } )
    // When I start the game a gameboard is initialized with a width and height
    it('should have width and height 100', () => {
        expect(gb.width).toBe(100)
        expect(gb.height).toBe(100)
    })

    // No game objects are present.
    it('should have no game objects present initially', () => {
        expect(gb.boardObjects.length).toBe(0)
    })
})

describe('cwrl 0.0.1 addObject ', () => {
    const gb = new GameBoard( { width: 100, height: 100 } )
    // Game objects are loaded onto the game board
    const obj1 = gb.addObject({})
    const obj2 = gb.addObject({})

    // Game objects are given an initial starting locations
    it('the first object should start in the top middle', () => {
        expect(obj1.x).toBe(50)
        expect(obj1.y).toBe(0)
    })

    it('the second object will start in the bottom middle', () => {
        expect(obj2.x).toBe(50)
        expect(obj2.y).toBe(100)
    })

})

describe('cwrl 0.0.1 move added object', () => {
    // When a game object is moved the board state is returned
    const gb = new GameBoard( { width: 100, height: 100 } )
    // Game objects are loaded onto the game board
    const obj1 = gb.addObject({})
    const obj2 = gb.addObject({})
    let boardState = gb.moveObject(obj1, {x:25, y:25})
    
    it('should return the current state of the board which is the boardObjects array', () => {
        expect(boardState).toBe(gb.boardObjects)
    })

    it('the board state should contain updated location for the moved object', () => {
        expect(boardState[0].x).toBe(25)
        expect(boardState[0].y).toBe(25)
    })

    it('the board state should contain the same location for the object not moved as it previously did', () => {
        expect(boardState[1].x).toBe(50)
        expect(boardState[1].y).toBe(100)
    })
})
