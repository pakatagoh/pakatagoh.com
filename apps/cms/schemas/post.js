export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
    },
    {
      name: "filePaths",
      title: "File Paths",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "filePath" }],
        },
      ],
    },
    {
      name: "body",
      title: "Body",
      type: "markdown",
      description: "A Github flavored markdown field with image uploading",
    },
  ],
};
