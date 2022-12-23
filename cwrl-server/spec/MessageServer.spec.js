import MessageServer from "../MessageServer/index.js";
import express from 'express'


describe('MessageServer addMessage', () => {
    beforeEach(function () {
        const app = express()
        this.server = app.listen('3000')
    })
    afterEach(function () {
        this.server.close()
        this.server = null
    })
    it ('should call send method of each WebSocket in players array', function () {
        const ms = new MessageServer(this.server, "/things")
        const message1 = "my first message"
        const message2 = "my second message"
        expect(ms.messages.length).toBe(0)
        ms.addMessage(message1)
        expect(ms.messages).toHaveSize(1)
        expect(ms.messages[0]).toBe(message1)
        ms.addMessage(message2)
        expect(ms.messages).toHaveSize(2)
        expect(ms.messages[0]).toBe(message2)
        expect(ms.messages[1]).toBe(message1)
    })
})

describe('MessageServer broadcast', () => {
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
    it ('should call send method of each WebSocket in clients', function () {
        const ms = new MessageServer(this.server, "/things")
        ms.clients.add(this.player1)
        ms.clients.add(this.player2)
        ms.clients.add(this.player3)
        const message1 = "my first message"
        const message2 = "my second message"
        ms.addMessage(message1)
        ms.broadcast()
        ms.addMessage(message2)
        ms.broadcast()
        expect(this.player1.send.calls.allArgs()[0]).toEqual([[message1]])
        expect(this.player2.send.calls.allArgs()[0]).toEqual([[message1]])
        expect(this.player3.send.calls.allArgs()[0]).toEqual([[message1]])
        expect(this.player1.send.calls.allArgs()[1]).toEqual([[message2, message1]])
        expect(this.player2.send.calls.allArgs()[1]).toEqual([[message2, message1]])
        expect(this.player3.send.calls.allArgs()[1]).toEqual([[message2, message1]])
    })
})