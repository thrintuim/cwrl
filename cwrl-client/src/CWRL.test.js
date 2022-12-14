import { render, screen } from '@testing-library/react';
import CWRL from './CWRL';

test('renders CWRL app without error', () => {
  function renderCWRL() {
    render(<CWRL />);
  }
  expect(renderCWRL).not.toThrow()
});
