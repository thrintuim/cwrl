import React from 'react'
import Board from './Board'
import Controls from './Controls'
import Messages from './Messages'

class CWRL extends React.Component {
    constructor(props) {
		super(props)
		this.state = {
			gameObjects: []
		}
		this.movementHandlers = {
			left: this.handleMove.bind(this, "left"),
			right: this.handleMove.bind(this, "right"),
			up: this.handleMove.bind(this, "up"),
			down: this.handleMove.bind(this, "down")
		}
    }

    handleMove(direction) {
		const activeObj = this.state.gameObjects.filter((el) => el.active)[0]
		const inactiveObjects = this.state.gameObjects.filter((el) => !el.active)
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
		this.setState({
			gameObjects: [activeObj, ...inactiveObjects]
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
			/>
		)
    }

    render(props) {
		return (
			<>
			<header>
				<h1>CWRL</h1>
			</header>
			<main>
			    <Board
					objects={this.gameObjects}
					add={this.addObjects}
			    />
			    <Controls handlers={this.movementHandlers}/>
			    <Messages
					title={"Movement History"}
					level={2}
					id={"movementHistory"}
			    />
			</main>
			</>
		);
    }
}

export default CWRL;
