const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const { default: CWRL } = require('./cwrl-app');
require('dotenv').config()



const driver1 = new Builder().forBrowser(Browser.CHROME).build()
const driver2 = new Builder().forBrowser(Browser.CHROME).build()
const player1 = new CWRL(driver1)
const player2 = new CWRL(driver2)
describe(`domain for CWRL exists at ${process.env.HOST}`, () => {
    it ('player 1 can navigate to the domain and not receive an error', async () => {
        expect(await player1.navigateToCWRL()).toBe(true)
    })
    it ('player 2 can navigate to the domain and not receive an error', async () => {
        expect(await player2.navigateToCWRL()).toBe(true)
    })
})

describe('when a player moves their object the movement history for each player', () => {
    let player1Coords = {x: 50, y: 0}
    it('should reflect that the player 1 object has been moved for all players', async () => {
        await player1.moveObject("Down")
        expect((await player1.getMovementHistory()).split('\n').slice().pop()).toBe('player 1 object moved to (50, 1)')
        expect((await player2.getMovementHistory()).split('\n').slice().pop()).toBe('player 1 object moved to (50, 1)')
        player1Coords.y = 1
    })

    it('should reflect that the player 1 object has been moved for all players', async () => {
        await player2.moveObject("Up")
        expect((await player1.getMovementHistory()).split('\n').slice().pop()).toBe('player 2 object moved to (50, 99)')
        expect((await player2.getMovementHistory()).split('\n').slice().pop()).toBe('player 2 object moved to (50, 99)')
    })

    it('should reflect the moves made from the player in each players move history', async () => {
        // To really test what is going on choose random moves and see if their reflected in the history for both players
        const directions = ['Left', 'Up', 'Right', 'Down']
        const threeMoves = [1,2,3].map((val, index) => {
            const dirIndex = Math.round(Math.random() * 3)
            return directions[dirIndex]
        })
        const player1History = threeMoves.map(async (dir) => {
            await player1.moveObject(dir)
            switch (dir) {
                case 'Left':
                    player1Coords.x -= 1
                    break;
                case 'Right':
                    player1Coords.x += 1
                    break;
                case 'Up':
                    player1Coords.y -= 1
                    break;
                case 'Down':
                    player1Coords.y += 1
                    break;
            }
            return {...player1Coords}
        })
        const player1MoveHistory = (await player1.getMovementHistory()).split('\n')
        const player2MoveHistory = (await player2.getMovementHistory()).split('\n')
        const player1Last3Moves = player1MoveHistory.splice(player1MoveHistory.length - 4, player1MoveHistory - 1)
        const player2Last3Moves = player1MoveHistory.splice(player1MoveHistory.length - 4, player1MoveHistory - 1)
        expect(player1MoveHistory.length).toBe(player2MoveHistory.length)
        player1History.forEach((entry, index) => {
            const msg = `player 1 object moved to (${entry.x}, ${entry.y})`
            expect(player1Last3Moves[index]).toBe(msg)
            expect(player2Last3Moves[index]).toBe(msg)
        })
    })
})
