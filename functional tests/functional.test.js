/*
Things to do with the 0.0.1 version of CWRL
    1. Create a game board
    2. No objects should be on the game board initially
    3. A game board can have objects added to it
    4. Game board tracks the position of those objects
    5. Objects are moved by updating the object on the gameboard
*/


import { GameBoard } from '../GameBoard/index.mjs'
import { GameObject } from '../GameObject/index.mjs'


test('A game board should have thet dimensions specified', () => {
    const gb = new GameBoard({width: 100, height: 100})
    expect(gb.width).toBe(100)
    expect(gb.height).toBe(100)
})

test('No objects should be on the game board', () => {
    const gb = new GameBoard({width: 100, height: 100})
    expect(gb.boardObjects.length).toBe(0)
})

test('Adding an object should return an instance of it', () => {
    const gb = new GameBoard({width:100, height: 100})
    const go = new GameObject()
    newObject = gb.addBoardObject(go)
    expect(gb.boardObjects[0]).toBe(go)
    expect(newObject).toBe(go)
    expect(gb.boardObjects.length).toBe(1)
})