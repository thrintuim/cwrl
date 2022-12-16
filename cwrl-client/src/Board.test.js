import { render, screen } from '@testing-library/react';
import Board from './Board'

test('renders Board component without error', () => {
  function renderBoard() {
      render(<Board />);
  }
  expect(renderBoard).not.toThrow()
});

test('renders Board component with objects', () => {
    function addObjects(obj, index) {
        return (<rect key={index} x={obj.x} y={obj.y} height="4" width="1" className="player" id={`player${index}`} />)
    } 
    render(<Board objects={[{x: 25, y: 35}, {x: 50, y: 75}]} add={addObjects} />)
    expect(document.getElementsByClassName("player").length).toBe(2)
})

test('throws an error when board is sent non objects as object props', () => {
    let cn = console.error
    console.error = jest.fn()
    expect(() => {
        render(<Board objects={1}/>);
    }).toThrow(TypeError);
    console.error = cn
  });
