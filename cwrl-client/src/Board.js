function Board(props) {
    if (props.objects) {
        return (
            <svg viewBox="0 0 100 100" id="board">
                { props.objects.map(props.add) }
            </svg>
        )
    }
    else {
        return (
            <svg viewBox="0 0 100 100" id="board"/>
        )
    }
}

export default Board
