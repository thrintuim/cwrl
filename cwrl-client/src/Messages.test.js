import { render, screen, within } from '@testing-library/react';
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

test('when a message is sent by the connection it is displayed', async () => {
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
    expect(el2.innerHTML).toBe("another piece of text")
    const el3 = await screen.findByRole("log")
    const messages = await within(el3).findAllByText(/(?:Howdy!|another)/i)
    expect(messages[0]).toBe(el)
    expect(messages[1]).toBe(el2)

})
