import Heading from './Heading'

function Controls (props) {
    return (
	<div id="Controls">
	    <Heading level={2} heading={"Controls"} />
	    <button type="button" onClick={props.handlers ? props.handlers.left : null} id="moveLeft">&#x2190;</button>
	    <button type="button" onClick={props.handlers ? props.handlers.right : null} id="moveRight">&#x2192;</button>
	    <button type="button" onClick={props.handlers ? props.handlers.up : null} id="moveUp">&#x2191;</button>
	    <button type="button" onClick={props.handlers ? props.handlers.down : null} id="moveDown">&#x2193;</button>
	</div>
    )
}

export default Controls
