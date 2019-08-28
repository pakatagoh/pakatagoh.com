import React from 'react';
import { render } from '@testing-library/react';
import PageTitle from './PageTitle';

describe('Page Title', () => {
  test('should return just a h1 tag', () => {
    const { getByText } = render(<PageTitle>Test Title</PageTitle>);

    expect(getByText('Test Title').tagName).toBe('H1');
  });

  test('should return a h2 tag if as prop is passed in as h2', () => {
    const { getByText, container } = render(<PageTitle as="h2">Test Title</PageTitle>);

    expect(getByText('Test Title').tagName).toBe('H2');
    expect(container.firstChild.tagName).toBe('H2');
  });

  test('should return a title wrapped in a div', () => {
    const { container } = render(<PageTitle block>Test Title</PageTitle>);

    const wrapperElement = container.firstChild;
    const title = wrapperElement.firstChild;

    expect(wrapperElement.tagName).not.toBe('H1');
    expect(title.tagName).toBe('H1');
  });
});
