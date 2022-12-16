import React from 'react'
import Board from './Board'
import Controls from './Controls'
import Messages from './Messages'

class CWRL extends React.Component {
    render(props) {
	return (
	    <>
		<header>
		    <h1>CWRL</h1>
		</header>
		<main>
		    <Board />
		    <Controls />
		    <Messages title={"Movement History"}  level={2} id={"movementHistory"}/>
		</main>
	    </>
	);
    }
}

export default CWRL;
