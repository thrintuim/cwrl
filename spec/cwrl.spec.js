const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const CWRL = require('./cwrl-app');
require('dotenv').config()




describe(`domain for CWRL exists at ${process.env.HOST}`, () => {
    beforeEach(function() {
        this.driver1 = new Builder().forBrowser(Browser.CHROME).build()
        this.driver2 = new Builder().forBrowser(Browser.CHROME).build()
        this.player1 = new CWRL(this.driver1)
        this.player2 = new CWRL(this.driver2)
    })
    afterEach(function() {
        this.driver1.quit()
        this.driver2.quit()
    })
    it ('player 1 can navigate to the domain and not receive an error', async function() {
        expect(await this.player1.navigateToCWRL()).toBe(true)
    })
    it ('player 2 can navigate to the domain and not receive an error', async function() {
        expect(await this.player2.navigateToCWRL()).toBe(true)
    })
})

describe('when a player moves their object the movement history for each player', () => {
    
    it('should reflect that the player 1 object has been moved for all players', async () => {
        await player1.moveObject("Down")
        expect((await player1.getMovementHistory()).split('\n').slice().pop()).toBe('player 1 object moved to (50, 1)')
        expect((await player2.getMovementHistory()).split('\n').slice().pop()).toBe('player 1 object moved to (50, 1)')
    })

    it('should reflect that the player 1 object has been moved for all players', async () => {
        await player2.moveObject("Up")
        expect((await player1.getMovementHistory()).split('\n').slice().pop()).toBe('player 2 object moved to (50, 99)')
        expect((await player2.getMovementHistory()).split('\n').slice().pop()).toBe('player 2 object moved to (50, 99)')
    })

    it('should reflect the moves made from the player in each players move history and on the boards', async () => {
        let player1Coords = {x: 50, y: 0}
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
            const currentCoords = {...player1Coords}
            const player1Object1 = await player1.getPlayerObject(1)
            const player2Object1 = await player2.getPlayerObject(1)
            expect(player1Object1).toBe(jasmine.anything())
            expect(player2Object1).toBe(jasmine.anything())
            expect(await player1Object1.getAttribute('x')).toBe(currentCoords.x)
            expect(await player1Object1.getAttribute('y')).toBe(currentCoords.y)
            expect(await player2Object1.getAttribute('x')).toBe(currentCoords.x)
            expect(await player2Object1.getAttribute('y')).toBe(currentCoords.y)
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
