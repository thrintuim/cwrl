import React from 'react'
import Heading from './Heading'


class Messages extends React.Component {
    constructor(props) {
		super(props)
		this.state = {
			messages: []
		}
	
    }

	/**Sets message state to received messages
	 * 
	 * ASSUMPTION: messages will always be in a stringified
	 * 	array
	 * 
	 * @param {MessageEvent} event 
	 */
    addHistory(event) {
		const newMessages = JSON.parse(event.data)
		this.setState(
			{
			messages: newMessages
			}
		)
    }

	/**Connect to message server or display the lack of connection.
	 * 
	 */
	componentDidMount() {
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

	/** Add messages to message area
	 * 
	 * @returns {React.ElementType[]}
	 */
	addMessages() {
		return this.state.messages.slice().reverse().map((message, index) => {
			return (<p key={index}>{message}</p>)
		})
	}

	/** Connection upon destruction
	 * 
	 */
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
