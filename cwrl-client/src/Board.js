function Board(props) {
        return (
            <svg viewBox="0 0 100 100" id="board">
                { props.children }
            </svg>
        )
}

export default Board
