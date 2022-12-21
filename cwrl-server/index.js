import express from 'express'
import { WebSocketServer } from 'ws'
import GameBoard from './GameBoard/index.mjs'

const app = express()
app.use(express.static('../cwrl-client/build'))

const gb = new GameBoard()

const server = app.listen('3000')

const objectServer = new WebSocketServer({ server: server, path: '/game' })
const moveLog = new WebSocketServer({ server: server, clientTracking: true , path: '/moveLog'})

const players = []
const observers = []

objectServer.on('connection')

moveLog.on('connection', () => {})
