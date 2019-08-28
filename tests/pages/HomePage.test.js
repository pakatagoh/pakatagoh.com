import React from 'react';
import { render } from '@testing-library/react';
import HomePage from '../../src/pages/index';
import useSiteMetaQuery from '../../src/hooks/useSiteMetaQuery';
import useHomePageQuery from '../../src/hooks/useHomePageQuery';
import useSeoQuery from '../../src/hooks/useSeoQuery';

jest.mock('../../src/hooks/useHomePageQuery.js');
jest.mock('../../src/hooks/useSeoQuery.js');
jest.mock('../../src/hooks/useSiteMetaQuery.js');

describe('Home Page', () => {
  beforeEach(() => {
    useSiteMetaQuery.mockReturnValueOnce({
      site: {
        siteMetadata: {
          title: 'Pakata Goh',
        },
      },
    });

    useSeoQuery.mockReturnValueOnce({
      site: {
        siteMetadata: {
          title: 'Pakata Goh',
          description:
            "Pakata is a software developer from Singapore specializing in JavaScript. In this personal site, he documents what he's learnt during his software development journey",
          author: 'Pakata Goh',
          canonicalUrl: 'https://pakatagoh.com',
          social: {
            twitter: 'GohPakata',
          },
        },
      },
      defaultImage: {
        childImageSharp: {
          fluid: {
            base64:
              'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAECAwT/xAAXAQADAQAAAAAAAAAAAAAAAAABAgMA/9oADAMBAAIQAxAAAAHGtOvCUCOfUnWQ6f/EABwQAQEAAgIDAAAAAAAAAAAAAAIBAAMREhMhIv/aAAgBAQABBQK7PjXELT7IVKiofl5KudsvNz//xAAXEQEAAwAAAAAAAAAAAAAAAAABABAh/9oACAEDAQE/AQy2f//EABURAQEAAAAAAAAAAAAAAAAAAAEg/9oACAECAQE/AWP/xAAcEAACAQUBAAAAAAAAAAAAAAAAASECEBESMiL/2gAIAQEABj8CxT0euXaBLWSKbp5ag//EABsQAQACAwEBAAAAAAAAAAAAAAEAESFBYRAx/9oACAEBAAE/IamroYlla7O+QcjsE9g3CRQ2XBYwnYqrAIhzb4Gf/9oADAMBAAIAAwAAABCMGIL/xAAZEQEBAQADAAAAAAAAAAAAAAABABEhMWH/2gAIAQMBAT8QRWnMnkdSdv/EABgRAQADAQAAAAAAAAAAAAAAAAEAEDEh/9oACAECAQE/EECdp2GT/8QAHBABAAMBAAMBAAAAAAAAAAAAAQARITFRcbHR/9oACAEBAAE/EKkSRPbzB6DpW656gWsloVs8HJrDvSB9iCcKs47Z2EXwc0QVyG5f7LqwFWF7P//Z',
            aspectRatio: 1,
            sizes: '(max-width: 800px) 100vw, 800px',
            src: '/static/4b511b158a88f80bbaf44448a9a6451c/bc3a8/pg-headshot.jpg',
            srcSet:
              '/static/4b511b158a88f80bbaf44448a9a6451c/d278e/pg-headshot.jpg 200w,\n/static/4b511b158a88f80bbaf44448a9a6451c/8539d/pg-headshot.jpg 400w,\n/static/4b511b158a88f80bbaf44448a9a6451c/bc3a8/pg-headshot.jpg 800w,\n/static/4b511b158a88f80bbaf44448a9a6451c/2f7e7/pg-headshot.jpg 1000w',
          },
        },
      },
    });
  });

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
