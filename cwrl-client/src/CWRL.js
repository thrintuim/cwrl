import React from 'react'
import Board from './Board'
import Controls from './Controls'
import Messages from './Messages'

class CWRL extends React.Component {
    constructor(props) {
		super(props)
		this.state = {
			// Usually get objects from WebSocket connection.
			// Passing objects as props allows to test movement handlers
			// 	without server connection
			gameObjects: props.objects ? props.objects : []
		}
		this.stateSync = {
			gameObjects: this.state.gameObjects
		}
		this.movementHandlers = {
			left: this.handleMove.bind(this, "left"),
			right: this.handleMove.bind(this, "right"),
			up: this.handleMove.bind(this, "up"),
			down: this.handleMove.bind(this, "down")
		}
		this.connection = props.serverConnection
    }

	componentDidMount() {
		this.serverConnection = new WebSocket(this.connection)
		this.serverConnection.addEventListener('message', this.updateObject.bind(this))
	}
	componentWillUnmount() {
		this.serverConnection.close()
	}

	/**
	 * 
	 * @param {MessageEvent} evt 
	 */
	updateObject(evt) {
		const objectData = JSON.parse(evt.data)
		// setting initial board state
	    if (Array.isArray(objectData)) {
			this.stateSync.gameObjects = objectData
			this.setState({
				gameObjects: this.stateSync.gameObjects
			})
			return true
		}
		// updating a specific player object on the board
		const findPlayerObject = this.stateSync.gameObjects.filter((el) => el.player === objectData.player)
		const toUpdate = findPlayerObject.length ? {} : findPlayerObject[0]
		const toLeave = this.stateSync.gameObjects.filter((el) => el.player !== objectData.player)
	    const updatedObject = Object.assign({}, toUpdate, objectData)
	    this.stateSync.gameObjects = [updatedObject, ...toLeave]
		this.setState({
			gameObjects: this.stateSync.gameObjects
		})
		
	}

    handleMove(direction) {
		const activeObj = this.stateSync.gameObjects.filter((el) => el.active)[0]
		const inactiveObjects = this.stateSync.gameObjects.filter((el) => !el.active)
		switch (direction) {
			case "left":
				activeObj.x -= 1
				break
			case "right":
				activeObj.x += 1
				break
			case "up":
				activeObj.y -= 1
				break
			case "down":
				activeObj.y += 1
				break
			default:
				break
		}
		const toSend = JSON.stringify(activeObj)
		this.serverConnection.send(toSend)
		this.stateSync.gameObjects = [activeObj, ...inactiveObjects]
		this.setState({
			gameObjects: this.stateSync.gameObjects
		})
    }

    addObjects(obj, index) {
		return (
			<rect
				key={`player${obj.player}`}
				x={obj.x}
				y={obj.y}
				width="1"
				height="4"
				id={`player${obj.player}`}
				fill="none"
				strokeWidth="0.5"
				stroke="black"
				data-testid={`player-object-${index + 1}`}
			/>
		)
    }

	showPlayers() {
		if (this.state.gameObjects.length > 0) {
			if (this.state.gameObjects.filter( (el) => el.active ).length > 0) {
				return `player ${this.state.gameObjects.filter( (el) => el.active )[0].player}`
				
			}
			else {
				return 'observer'
			}
		}
		else {
			return 'no game objects'
		}
	}

    render(props) {
		return (
			<>
				<header>
					<h1>{`CWRL - ${this.showPlayers()}`}</h1>
				</header>
				<main>
					<Board>
						{this.state.gameObjects.map(this.addObjects)}
					</Board>
					<Controls handlers={this.movementHandlers}/>
					<Messages
						title={"Movement History"}
						level={2}
						id={"movementHistory"}
						connection={`ws://${window.location.host}/moveLog`}
					/>
				</main>
			</>
		);
    }
}

export default CWRL;
