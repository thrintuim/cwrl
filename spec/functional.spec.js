/*
Things to do with the 0.0.1 version of CWRL
    1. Create a game board
    2. No objects should be on the game board initially
    3. A game board can have objects added to it
    4. Game board tracks the position of those objects
    5. Objects are moved by updating the object on the gameboard

CWRL - 0.0.1
When I start the game a gameboard is initialized with a width and height
No game objects are present.
Game objects are loaded onto the game board
Game objects are given some initial starting location
When a game object is moved the board state is returned

CWRL - 0.0.2


CWRL - 0.1.0 - Amateur night - Player perspective
A player decides to be the host and initializes the game/encounter
The player is given a code that they can use to invite other players
Using the code two other players are added to the game/encounter
Each player starts with a murderous mini vehicle
All players indicate that they are ready to start
Host elects to start the game/encounter
Turns are divided into 5 rounds
At the beginning of the turn each player chooses to accelerate by 10 mph
all players confirm this choice
On the first round each player moves straight
As the game progresses player 1 and 2 fire at each other and eventually ram each other
Player 3 tries to get into the mix but loses control of their mini and crashes into an object
Main features
    A player can be a host
    other players can join with a code
    Players can complete their turns asynchronously
    when all turns are submitted they are resolved simultaneously


*/

import { GameBoard } from '../GameBoard/index.mjs'

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
