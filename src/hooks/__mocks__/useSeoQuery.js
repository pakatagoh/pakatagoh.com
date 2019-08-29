const mockedUseSeoQuery = jest.fn().mockReturnValue({
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

export default mockedUseSeoQuery;
