import React from 'react'
import Heading from './Heading'


class Messages extends React.Component {
    constructor(props) {
		super(props)
		this.state = {
			messages: []
		}
	
    }

    addHistory(event) {
		const newMessages = [...this.state.messages, event.data]
		this.setState(
			{
			messages: newMessages
			}
		)
    }

	componentDidMount() {
		this.mounted = true
		if (this.props.connection) {
			this.connection = new WebSocket(this.props.connection)
			this.connection.addEventListener('message', this.addHistory.bind(this))
		}
		else {
			this.setState({
				messages: ["No connection to server"]
			})
		}
	}

	addMessages() {
		return this.state.messages.map((message, index) => {
			return (<p key={index}>{message}</p>)
		})
	}

	componentWillUnmount() {
		if (this.connection) {
			this.connection.close()
		}
	}
    
    render() {
	return (
	    <div id={this.props.id} role="log">
			<Heading level={this.props.level} heading={this.props.title} />
			{this.addMessages()}
	    </div>
	)
    }
}

export default Messages
