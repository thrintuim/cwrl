import { render, screen, fireEvent } from '@testing-library/react';
import Controls from './Controls'
import { act } from 'react-dom/test-utils'



test('renders Controls component without error', () => {
  function renderControls() {
      render(<Controls />);
  }
  expect(renderControls).not.toThrow()
});

test('Buttons execute onClick handlers correctly', () => {
    const handlers = {
	left: jest.fn().mockName('left handler'),
	right: jest.fn().mockName('right handler'),
	up: jest.fn().mockName('up handler'),
	down: jest.fn().mockName('down handler')
    }
    const arrows = {
	left: '\u2190',
	right: '\u2192',
	up: '\u2191',
	down: '\u2193'
    }
    render(<Controls handlers={handlers} />)
    for (const key in handlers) {
	act(() => {
	    const el = screen.getByText(arrows[key])
	    fireEvent.click(el)
	})
	expect(handlers[key]).toHaveBeenCalled()
    }
})
