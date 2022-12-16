import React from 'react'


class Messages extends React.Component {
    constructor(props) {
	super(props)
	this.state = {
	    messages: ""
	}
	if (this.props.connection) {
	    this.connection = new WebSocket(this.props.connection)
	    this.connection.addEventListener('message', this.addHistory.bind(this))
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
    
    render() {
	return (
	    <div id={this.props.id}>
		{this.state.messages}
	    </div>
	)
    }
}

export default Messages
