import { WebSocketServer } from "ws";

class GameStateServer extends WebSocketServer {
    /** WebSocketServer to communicate the game state
     */
    constructor() {
        super({noServer: true})
        this.players = new Set()
	this.observers = new Set()
        this.path = "/game"      
    }

    /**Send the object to all players with active === true for current player
     * 
     * @param {WebSocket} currentPlayer 
     * @param {Object} obj 
     */
    updatePlayers(currentPlayer, obj) {
        obj.active = false
        const stringifiedObj = JSON.stringify(obj)
        this.players.forEach((ws) => {
            if (ws === currentPlayer) {
                ws.send(
                    JSON.stringify(
                        Object.assign({}, obj, {active: true})
                    )
                )
            }
            else {
                ws.send(stringifiedObj)
            }
        })
    }
}

export default GameStateServer
