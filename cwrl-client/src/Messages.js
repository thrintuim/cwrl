import React from 'react'
import Heading from './Heading'


class Messages extends React.Component {
    constructor(props) {
		super(props)
		this.state = {
			messages: ""
		}
	
    }

    addHistory(event) {
		const msg = this.state.messages === "" ? event.data : '\n' + event.data
		const newMessages = this.state.messages + msg
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
	}

	componentWillUnmount() {
		if (this.connection) {
			this.connection.close()
		}
	}
    
    render() {
	return (
	    <div id={this.props.id}>
		<Heading level={this.props.level} heading={this.props.title} />
		{this.state.messages}
	    </div>
	)
    }
}

export default Messages
