const mockedUseSiteMetaQuery = jest.fn().mockReturnValue({
  site: {
    siteMetadata: {
      title: 'Pakata Goh',
    },
  },
});

export default mockedUseSiteMetaQuery;
