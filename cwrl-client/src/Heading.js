function Heading(props) {
    switch (props.level) {
    case 1:
	return(<h1>{props.heading}</h1>)
    case 2:
	return(<h2>{props.heading}</h2>)
    case 3:
	return(<h3>{props.heading}</h3>)
    case 4:
	return(<h4>{props.heading}</h4>)
    case 5:
	return(<h5>{props.heading}</h5>)
    default:
	return(<h6>{props.heading}</h6>)
    }
}

export default Heading
