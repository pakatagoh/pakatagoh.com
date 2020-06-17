import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Blog from '../../src/pages/blog';
import Layout from '../../src/components/Layout';
import useBlogPageQuery from '../../src/hooks/useBlogPageQuery';

jest.mock('../../src/hooks/useSeoQuery');
jest.mock('../../src/hooks/useSiteMetaQuery');
jest.mock('../../src/hooks/useBlogPageQuery');

const renderWithLayout = component => {
  return { ...render(<Layout>{component}</Layout>) };
};

describe('Blog Page', () => {
  beforeEach(() => {
    useBlogPageQuery.mockReturnValue({
      allMdx: {
        edges: [
          {
            node: {
              id: '1',
              excerpt: 'Some excerpt here',
              fields: {
                createdAt: '2019-08-30',
                description: 'some description here 1',
                editOnGithubLink: 'http://example.com1',
                isPublished: true,
                keywords: ['keyword1'],
                slug: '/blog/test1',
                title: 'some title1',
                updatedAt: '',
              },
            },
          },
          {
            node: {
              id: '2',
              excerpt: 'Some excerpt here',
              fields: {
                createdAt: '2019-08-31',
                description: 'some description here 2',
                editOnGithubLink: 'http://example.com2',
                isPublished: true,
                keywords: ['keyword2', 'haha'],
                slug: '/blog/test2',
                title: 'some title2 haha',
                updatedAt: '',
              },
            },
          },
        ],
      },
    });
  });
  test('should display one blog post', () => {
    const expectedText1 = /some title1/i;
    const expectedText2 = /some title2/i;

    const { getByText } = renderWithLayout(<Blog />);

    expect(getByText(expectedText1)).toBeInTheDocument();
    expect(getByText(expectedText2)).toBeInTheDocument();
  });

  test('should display no posts to show at the moment', () => {
    useBlogPageQuery.mockReturnValueOnce({
      allMdx: {
        edges: [],
      },
    });
    const expectedText = /no posts to show/i;

    const { getByText } = renderWithLayout(<Blog />);

    expect(getByText(expectedText)).toBeInTheDocument();
  });

  test('only show some title2 after typing some title2 in input', async () => {
    const { queryByText, getByText, getByPlaceholderText } = renderWithLayout(<Blog />);

    const searchInput = getByPlaceholderText(/search posts/i);
    fireEvent.change(searchInput, { target: { value: 'some title2' } });

    await waitFor(() => {
      expect(getByText(/some title2/i)).toBeInTheDocument();
      expect(queryByText(/some title1/i)).not.toBeInTheDocument();
    });
  });

  test('show all posts after deleting text from input', async () => {
    const { queryByText, getByText, getByPlaceholderText } = renderWithLayout(<Blog />);

    const searchInput = getByPlaceholderText(/search posts/i);
    fireEvent.change(searchInput, { target: { value: 'some title2' } });

    await waitFor(() => {
      expect(getByText(/some title2/i)).toBeInTheDocument();
      expect(queryByText(/some title1/i)).not.toBeInTheDocument();
    });

    fireEvent.change(searchInput, { target: { value: '' } });

    await waitFor(() => {
      expect(getByText(/some title1/i)).toBeInTheDocument();
      expect(getByText(/some title2/i)).toBeInTheDocument();
    });
  });
});
