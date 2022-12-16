import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils'
import Messages from './Messages'
import { WebSocketServer } from 'ws'

const port = 3000
const host = 'ws://localhost'
const connection = `${host}:${port}`
const wss = new WebSocketServer({ port: port, clientTracking: true })

afterAll(() => {
    wss.close()
})

test('renders Messages component without error', () => {
  function renderMessages() {
      render(<Messages connection={connection} />);
  }
  expect(renderMessages).not.toThrow()
});

test('when msg is passed as a prop the value is displayed', async () => {
    render(<Messages connection={connection} />)
    act(() => {
	wss.on('connection', (ws) => {
	    ws.send('Howdy!')
	})
    })
    const el = await screen.findByText(/Howdy!/i)
    expect(el).toBeDefined()
    act(() => {
	wss.clients.forEach((client) => {
	    client.send('another piece of text')
	})
    })
    const el2 = await screen.findByText(/another/i)
    expect(el2).toBeDefined()
    expect(el).toBe(el2)
    expect(el2.innerHTML.split('\n').length).toBe(2)
})
