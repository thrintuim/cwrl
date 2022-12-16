import { render, screen } from '@testing-library/react';
import Heading from './Heading'



test('renders Heading component without error', () => {
  function renderHeading() {
      render(<Heading />);
  }
  expect(renderHeading).not.toThrow()
});

test('level prop set the heading level correctly', () => {
    for (let level = 1; level < 7; level++) {
	const text = `level ${level}`
	render(<Heading heading={text} level={level}/>)
	const el = screen.getByText(text)
	expect(el.tagName.toLowerCase()).toBe(`h${level}`)
    }
})

test('heading level defaults to 6', () => {
    render(<Heading heading={"blah"}/>)
    expect(screen.getByText("blah").tagName.toLowerCase()).toBe("h6")
})
