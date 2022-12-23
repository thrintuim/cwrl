import GameStateServer from "../GameStateServer/index.js";
import express from 'express'

describe('GameStateServer update players', () => {
    beforeEach(function () {
        const app = express()
        this.server = app.listen('3000')
        this.player1 = jasmine.createSpyObj('MockWS', ['send'])
        this.player2 = jasmine.createSpyObj('MockWS', ['send'])
        this.player3 = jasmine.createSpyObj('MockWS', ['send'])
    })
    afterEach(function () {
        this.server.close()
        this.server = null
    })
    it ('should call send method of each WebSocket in players array', function () {
        const gss = new GameStateServer(this.server, "/things")
        gss.players.add(this.player1)
        gss.players.add(this.player2)
        gss.players.add(this.player3)
        const obj = {things: "stuff"}
        const activeObject = Object.assign({}, obj, {active: true})
        const inactiveObject = Object.assign({}, obj, {active: false})
        gss.updatePlayers(this.player1, obj)
        expect(this.player1.send).toHaveBeenCalledWith(activeObject)
        expect(this.player2.send).toHaveBeenCalledWith(inactiveObject)
        expect(this.player3.send).toHaveBeenCalledWith(inactiveObject)
    })
})