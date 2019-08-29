import React from 'react';
import { render } from '@testing-library/react';
import Contact from '../../src/pages/contact';
import useContactPageQuery from '../../src/hooks/useContactPageQuery';

jest.mock('../../src/hooks/useSeoQuery');
jest.mock('../../src/hooks/useSiteMetaQuery');
jest.mock('../../src/hooks/useContactPageQuery');

useContactPageQuery.mockReturnValue({
  contactImage: {
    childImageSharp: {
      fluid: {
        base64: 'some string',
        aspectRatio: 1,
        sizes: 'some string',
        src: 'some string',
        srcSet: 'some string',
      },
    },
  },
});

describe('Contact Page', () => {
  test('should render Contact as h1', () => {
    const expectedText = /Contact/i;

    const { container } = render(<Contact />);
    const h1Element = container.querySelector('h1');

    expect(h1Element).toHaveTextContent(expectedText);
  });
});
