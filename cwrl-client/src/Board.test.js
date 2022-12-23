import { render, screen } from '@testing-library/react';
import Board from './Board'

test('renders Board component without error', () => {
  function renderBoard() {
      render(<Board />);
  }
  expect(renderBoard).not.toThrow()
});

test('renders Board component with children', () => {
    render(<Board><p>this is a thing</p></Board>)
    expect(screen.getByText('this is a thing')).toBeDefined()
})

