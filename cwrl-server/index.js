import express from 'express'
import GameBoard from './GameBoard/index.mjs'
import GameStateServer from './GameStateServer/index.js'
import MessageServer from './MessageServer/index.js'
import dotenv from 'dotenv'
import url from 'url'
dotenv.config()

const app = express()
app.use(express.static('../cwrl-client/build'))

const gb = new GameBoard({width:100, height: 100})
const maxPlayers = gb.entryPoints.length


const server = app.listen('3000')

const gss = new GameStateServer()
const ms = new MessageServer()

gss.on('connection', function (ws) {
    // need to handle the case where a player has dropped
    //  and someone will fill their place.
    ws.on('close', function () {
        gss.players.delete(this)
    })
    ws.on('error', function (stuff) {
    })
    if (this.players.size < maxPlayers) {
    this.players.add(ws)
    ws.player = this.players.size
    const existingPlayerObject = gb.boardObjects.filter((obj) => obj.player === ws.player)
    const playerObject = existingPlayerObject.length ? existingPlayerObject[0] : gb.addObject({player: ws.player})
    ws.send(JSON.stringify(gb.boardObjects))
    this.updatePlayers(ws, playerObject)
    ms.addMessage(`player ${ws.player} has joined at (${playerObject.x}, ${playerObject.y})`)
    ms.broadcast()
    ws.on('message', function (evt) {
        const objUpdate = JSON.parse(evt)
        gss.updatePlayers(this, objUpdate)
        ms.addMessage(`player ${this.player} object moved to (${objUpdate.x}, ${objUpdate.y})`)
        ms.broadcast()
    })
    }
    else {
	ws.close()
    }
})

gss.on('error', function (stuff) {
    console.log(stuff)
})

ms.on('error', function (stuff) {
    console.log(stuff)
})

gss.on('close', function (ws) {
    this.players.delete(ws)
})

server.on('upgrade', (request, socket, head) => {
    const pathname = url.parse(request.url).pathname
    if (pathname === gss.path) {
        gss.handleUpgrade(request, socket, head, (ws) => {
            gss.emit('connection', ws)
        })
    }
    else if (pathname === ms.path) {
        ms.handleUpgrade(request, socket, head, (ws) => {
            ms.emit('connection', ws)
        })
    }
    else {
        // Since we aren't creating new instances each reload we need a way to set back to zero
        // In the tests the convention will be a ws request to /reset
        ms.messages = []
        ms.clients.clear()
        gss.players.clear()
        gb.boardObjects = []
        socket.destroy()
    }
})
