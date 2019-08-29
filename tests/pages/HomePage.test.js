import React from 'react';
import { render } from '@testing-library/react';
import HomePage from '../../src/pages/index';
import useHomePageQuery from '../../src/hooks/useHomePageQuery';

jest.mock('../../src/hooks/useHomePageQuery');
jest.mock('../../src/hooks/useSeoQuery');
jest.mock('../../src/hooks/useSiteMetaQuery');

describe('Home Page', () => {
  test("should show Hey I'm pakata in h1 tag", () => {
    useHomePageQuery.mockReturnValueOnce({
      pgImageSquare: {
        childImageSharp: {
          fluid: {
            base64: 'some string',
            aspectRatio: 1,
            srcSet: 'some string',
            src: 'some string',
            sizes: 'some string',
          },
        },
      },
      pgImageWide: {
        childImageSharp: {
          fluid: {
            base64: 'some string',
            aspectRatio: 1,
            srcSet: 'some string',
            src: 'some string',
            sizes: 'some string',
          },
        },
      },
      allMdx: {
        edges: [
          {
            node: {
              id: '27357dcb-2d66-587c-9abc-6e325d796e6b',
              excerpt: 'Some excerpt here',
              fields: {
                createdAt: '2019-08-26',
                description: 'some description here',
                editOnGithubLink: 'http://example.com',
                isPublished: true,
                keywords: ['career switch', 'jobs', 'preparation', 'research'],
                slug: '/blog/test',
                title: 'some title',
                updatedAt: '',
              },
            },
          },
        ],
      },
    });

    const { getByText } = render(<HomePage />);

    const h1 = getByText(/Hey! I'm/i);
    expect(h1).toBeInTheDocument();
  });

  test('should show no posts showing if no posts returned from graphql query', () => {
    useHomePageQuery.mockReturnValueOnce({
      pgImageSquare: {
        childImageSharp: {
          fluid: {
            base64: 'some string',
            aspectRatio: 1,
            srcSet: 'some string',
            src: 'some string',
            sizes: 'some string',
          },
        },
      },
      pgImageWide: {
        childImageSharp: {
          fluid: {
            base64: 'some string',
            aspectRatio: 1,
            srcSet: 'some string',
            src: 'some string',
            sizes: 'some string',
          },
        },
      },
      allMdx: {
        edges: [],
      },
    });

    const { getByText } = render(<HomePage />);

    const noPostsText = getByText(/No posts to show/i);
    expect(noPostsText).toBeInTheDocument();
  });
});
