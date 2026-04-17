import { render, screen , waitFor} from '@testing-library/react';
import CWRL from './CWRL';
import WS from 'jest-websocket-mock'

let server
const HOST = "ws://localhost:1234/game"

beforeEach (() => {
  server = new WS(HOST)
})
afterEach(() => {
  server.close()
})

test('renders CWRL app without error', () => {
  function renderCWRL() {
    render(<CWRL serverConnection={HOST} />);
  }
  expect(renderCWRL).not.toThrow()
});

test('player role and number is present', async () => {

  // expected player data
  let data = [{
    active: true,
    player: 1,
    x: 50,
    y: 0
  },
  {
    active: false,
    player: 2,
    x: 0,
    y: 50
  }]
  render(<CWRL serverConnection={HOST} />)
  await server.connected
  server.send(JSON.stringify(data))
  // CWRL - (player|observer) \d+
  await waitFor(() => expect(screen.getByText(/player 1/)).toBeInTheDocument() )
})

test('when the user has no active element they are noted as an observer', async () => {

  // expected player data
  let data = [{
    active: false,
    player: 1,
    x: 50,
    y: 0
  },
  {
    active: false,
    player: 2,
    x: 0,
    y: 50
  }]
  render(<CWRL serverConnection={HOST} />)
  await server.connected
  server.send(JSON.stringify(data))
  // CWRL - (player|observer) \d+
  await waitFor(() => expect(screen.getByText(/observer/)).toBeInTheDocument() )
})