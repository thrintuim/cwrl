import GameStateServer from "../GameStateServer/index.js";
import express from 'express'

describe('GameStateServer update players', () => {
    beforeEach(function () {
        this.player1 = jasmine.createSpyObj('MockWS', ['send'])
        this.player2 = jasmine.createSpyObj('MockWS', ['send'])
        this.player3 = jasmine.createSpyObj('MockWS', ['send'])
        this.observer1 = jasmine.createSpyObj('MockWS', ['send'])
    })
    it ('should call send method of each WebSocket in players Set', function () {
        const gss = new GameStateServer()
        gss.players.add(this.player1)
        gss.players.add(this.player2)
        gss.players.add(this.player3)
        const obj = {things: "stuff"}
        const activeObject = JSON.stringify(Object.assign({}, obj, {active: true}))
        const inactiveObject = JSON.stringify(Object.assign({}, obj, {active: false}))
        gss.updatePlayers(this.player1, obj)
        expect(this.player1.send).toHaveBeenCalledWith(activeObject)
        expect(this.player2.send).toHaveBeenCalledWith(inactiveObject)
        expect(this.player3.send).toHaveBeenCalledWith(inactiveObject)
    })
    it ('should call send method of each WebSocket in observers Set', function () {
        const gss = new GameStateServer()
        gss.players.add(this.player1)
        gss.observers.add(this.observer1)
        const obj = {things: "stuff"}
        const inactiveObject = JSON.stringify(Object.assign({}, obj, {active: false}))
        gss.updatePlayers(this.player1, obj)
        expect(this.observer1.send).toHaveBeenCalledWith(inactiveObject)
    })
})