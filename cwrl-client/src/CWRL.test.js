import { render, screen } from '@testing-library/react';
import CWRL from './CWRL';
import WebSocket from 'ws';

jest.mock('ws')

let mockConnection
beforeEach (() => {
  mockConnection = new WebSocket()
})
afterEach(() => {
  jest.resetAllMocks()
})

test('renders CWRL app without error', () => {
  function renderCWRL() {
    render(<CWRL serverConnection={mockConnection} />);
  }
  expect(renderCWRL).not.toThrow()
});

test('player role and number is present', async () => {

  let eventHandler= [];
  // TO DO: Need to move WebSocket to App and pass values to CWRL
  mockConnection.addEventListener.mockImplementation((event, handler) => {
    eventHandler[event] = handler;
  });
  mockConnection.close.mockImplementation(() => {})
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
  render(<CWRL serverConnection={mockConnection} />)
  mockConnection.emit('message', JSON.stringify(data))
  // CWRL - (player|observer) \d+
  expect(await screen.findByText('player 1')).toBeInTheDocument()
})