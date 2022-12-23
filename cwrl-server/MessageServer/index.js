import { WebSocketServer } from "ws";

class MessageServer extends WebSocketServer {
    constructor() {
        super({noServer: true})
        this.messages = []
        this.path = '/moveLog'
    }
    broadcast() {
        this.clients.forEach((ws) => {
            ws.send(JSON.stringify(this.messages))
        })
    }
    addMessage(message) {
        this.messages = [message, ...this.messages]
        return this.messages
    }
}

export default MessageServer