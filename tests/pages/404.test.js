import React from 'react';
import { render } from '@testing-library/react';
import NotFoundPage from '../../src/pages/404';

jest.mock('../../src/hooks/useSiteMetaQuery');
jest.mock('../../src/hooks/useSeoQuery');

describe('404 page', () => {
  test('should render 404: Not found as h1', () => {
    const expectedText = /404: Not found/i;

    const { getByText } = render(<NotFoundPage />);

    expect(getByText(expectedText)).toBeInTheDocument();
  });
});
