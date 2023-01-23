const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const { WebSocket } = require('ws')
const firefox = require('selenium-webdriver/firefox');
const chrome = require('selenium-webdriver/chrome');
const CWRL = require('./cwrl-app');
require('dotenv').config()
function sleep(t) {
    return new Promise((resolve) => setTimeout(resolve, t))
}

const fo = new firefox.Options().headless()
const co = new chrome.Options().headless()
if (process.env.ENV_SPEED === "SLOW") {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000
}

/**
 * intended to be called with .call inside of beforeEach
 *  or passed directly to beforeEach
 */
function setUpDriversAndPlayers() {
    this.driver1 = new Builder()
        .forBrowser(Browser.CHROME)
        .setFirefoxOptions(fo)
        .setChromeOptions()
	.build()
    this.driver2 = new Builder()
        .forBrowser(Browser.CHROME)
        .setFirefoxOptions(fo)
        .setChromeOptions()
        .build()
    this.player1 = new CWRL(this.driver1)
    this.player2 = new CWRL(this.driver2)
}

/**
 * intended to be passed to afterEach
 */
async function tearDownDriversAndPlayers() {
    await this.driver1.quit()
    await this.driver2.quit()
    this.player1 = null
    this.player2 = null
    const url = `ws://${process.env.HOST || 'localhost'}:${process.env.PORT || '3000'}/reset`
    const ws = new WebSocket(url)
    ws.on('error', (err) => { })
    // Wait for the websocket to send the handshake request
    await sleep(500)
}

async function navigateToCWRL() {
    await this.player1.navigateToCWRL()
    await this.player2.navigateToCWRL()
}



describe(`domain for CWRL exists at ${process.env.HOST}`, () => {
    beforeEach(setUpDriversAndPlayers)
    afterEach(tearDownDriversAndPlayers)
    it ('player 1 can navigate to the domain and not receive an error', async function() {
        expect(await this.player1.navigateToCWRL()).toBe(true)
    })
    it ('player 2 can navigate to the domain and not receive an error', async function() {
        expect(await this.player2.navigateToCWRL()).toBe(true)
    })
})

describe('when a player joins the game', () => {
    beforeEach(setUpDriversAndPlayers)
    afterEach(tearDownDriversAndPlayers)
    it('the board should have only 1 object when player 1 joins', async function () {
        await this.player1.navigateToCWRL()
        expect(await this.player1.getPlayerObject(1)).toEqual(jasmine.anything())
        expect(await this.player1.getPlayerObject(2)).toBe(undefined)
    })
    it('the movement history should reflect their entry when player 1 joins', async function() {
        await this.player1.navigateToCWRL()
        expect((await this.player1.getMovementHistory()).slice().pop()).toBe('player 1 has joined at (50, 0)')
    })

    it('each player board should have 2 objects when player 2 joins', async function () {
        await this.player1.navigateToCWRL()
        await this.player2.navigateToCWRL()
        expect(await this.player1.getPlayerObject(1)).toEqual(jasmine.anything())
        expect(await this.player1.getPlayerObject(2)).toEqual(jasmine.anything())
        expect(await this.player2.getPlayerObject(1)).toEqual(jasmine.anything())
        expect(await this.player2.getPlayerObject(2)).toEqual(jasmine.anything())
    })

    it('the movement history should reflect their entry when each player joins', async function() {
        await this.player1.navigateToCWRL()
        await this.player2.navigateToCWRL()
        const player1history = await this.player1.getMovementHistory()
        expect(player1history).toEqual(jasmine.anything())
        if (player1history) {
            expect(player1history.length).toBe(2)
            expect(player1history[0]).toBe('player 1 has joined at (50, 0)')
            expect(player1history[1]).toBe('player 2 has joined at (50, 100)')
        }
        const player2history = await this.player2.getMovementHistory()
        expect(player2history).toEqual(jasmine.anything())
        if (player2history) {
            expect(player2history.length).toBe(2)
            expect(player2history[0]).toBe('player 1 has joined at (50, 0)')
            expect(player2history[1]).toBe('player 2 has joined at (50, 100)')
        }
    })
})

describe('when a player moves their object the movement history for each player', () => {
    beforeEach(setUpDriversAndPlayers)
    afterEach(tearDownDriversAndPlayers)
    
    it('should reflect that the player 1 object has been moved for all players', async function () {
        await this.player1.navigateToCWRL()
        await this.player2.navigateToCWRL()
        await this.player1.moveObject("Down")
        expect((await this.player1.getMovementHistory()).slice().pop()).toBe('player 1 object moved to (50, 1)')
        expect((await this.player2.getMovementHistory()).slice().pop()).toBe('player 1 object moved to (50, 1)')
    })

    it('should reflect that the player 2 object has been moved for all players', async function () {
        await this.player1.navigateToCWRL()
        await this.player2.navigateToCWRL()

        await this.player2.moveObject("Up")
        expect((await this.player1.getMovementHistory()).slice().pop()).toBe('player 2 object moved to (50, 99)')
        expect((await this.player2.getMovementHistory()).slice().pop()).toBe('player 2 object moved to (50, 99)')
    })

    it('should reflect the moves made from the player in each players move history and on the boards', async function () {
        await this.player1.navigateToCWRL()
        await this.player2.navigateToCWRL()
        let player1Coords = {x: 50, y: 0}
        // To really test what is going on choose random moves and see if their reflected in the history for both players
        const directions = ['Left', 'Up', 'Right', 'Down']
        const threeMoves = [1,2,3].map((val, index) => {
            const dirIndex = Math.round(Math.random() * 3)
            return directions[dirIndex]
        })
        const player1History = []
        for (const dir of threeMoves) {
            await this.player1.moveObject(dir)
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
            let currentCoords = {...player1Coords}
            let player1Object1 = await this.player1.getPlayerObject(1)
            let player2Object1 = await this.player2.getPlayerObject(1)
            expect(player1Object1).toEqual(jasmine.anything())
            expect(player2Object1).toEqual(jasmine.anything())
            expect(await player1Object1.getAttribute('x')).toBe(`${currentCoords.x}`)
            expect(await player1Object1.getAttribute('y')).toBe(`${currentCoords.y}`)
            expect(await player2Object1.getAttribute('x')).toBe(`${currentCoords.x}`)
            expect(await player2Object1.getAttribute('y')).toBe(`${currentCoords.y}`)
            player1History.push({...currentCoords})
        }
        const player1MoveHistory = await this.player1.getMovementHistory()
        const player2MoveHistory = await this.player2.getMovementHistory()
        const player1Last3Moves = player1MoveHistory.slice(player1MoveHistory.length - 3)
        const player2Last3Moves = player2MoveHistory.slice(player2MoveHistory.length - 3)
        expect(player1MoveHistory).toHaveSize(5)
        expect(player1MoveHistory.length).toEqual(player2MoveHistory.length)
        player1History.forEach((entry, index) => {
            const msg = `player 1 object moved to (${entry.x}, ${entry.y})`
            expect(player1Last3Moves[index]).toBe(msg)
            expect(player2Last3Moves[index]).toBe(msg)
        })
    })
})

describe('When more than four players join', () => {
    beforeEach(async function() {
	this.drivers = [1,2,3,4,5,6].map(() => {
	    return new Builder()
		.forBrowser(Browser.CHROME)
		.setFirefoxOptions(fo)
		.setChromeOptions()
		.build()
	})
	this.players = this.drivers.map((driver) => {
	    return new CWRL(driver)
	})
	for (const player of this.players) {
	    await player.navigateToCWRL()
	}
    })
    afterEach(async function() {
	const closingBrowser = this.drivers.map((driver) => {
	    return driver.quit()
	})
	await Promise.all(closingBrowser)
	this.players = null
	const url = `ws://${process.env.HOST || 'localhost'}:${process.env.PORT || '3000'}/reset`
	const ws = new WebSocket(url)
	ws.on('error', (err) => { })
	// Wait for the websocket to send the handshake request
	await sleep(500)
    })

    it ('the first 4 players should have objects', async function () {
	const player1 = this.players[0]
	const msgs = await player1.getMovementHistory()
	const playerJoin = new RegExp(/player \d+ joined/)
	const joins = msgs.filter(msg => playerJoin.test(msg))
	expect(joins).toHaveSize(4)
	expect(player1.getPlayerObject(1)).toExist()
	expect(player1.getPlayerObject(2)).toExist()
	expect(player1.getPlayerObject(3)).toExist()
	expect(player1.getPlayerObject(4)).toExist()
    })
    it ('the other players should be marked as observers', async function () {
	const player1 = this.players[0]
	const msgs = await player1.getMovementHistory()
	const observerJoin = new RegExp(/observer \d+ joined/)
	const joins = msgs.filter(msg => observerJoin.test(msg))
	expect(joins).toHaveSize(2)
	
    })
})
