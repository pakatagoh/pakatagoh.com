const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const slugify = require('slugify');
const format = require('date-fns/format');
const slash = require('slash');
const config = require('./config');

exports.createPages = async ({ graphql, actions, reporter }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMdx(filter: { fields: { isPublished: { eq: true } } }) {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  // Create blog post pages.
  const posts = result.data.allMdx.edges;

  posts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/PostTemplate.js`),
      context: { id: node.id },
    });
  });
};

/*
 * @description: how to programmatically create slugs for mdx
 * @link: https://www.gatsbyjs.org/docs/mdx/programmatically-creating-pages/
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    const { frontmatter } = node;
    let slug = frontmatter.slug || slugify(frontmatter.title, { lower: true }) || createFilePath({ node, getNode });

    if (node.fileAbsolutePath.includes('content/blog/')) {
      slug = `/blog/${slug}`;
    }

    createNodeField({
      name: 'slug',
      node,
      value: slug,
    });

    createNodeField({
      name: 'title',
      node,
      value: frontmatter.title,
    });

    createNodeField({
      name: 'updatedAt',
      node,
      value: frontmatter.updatedAt ? format(new Date(frontmatter.updatedAt), 'y-MM-dd') : '',
    });

    createNodeField({
      name: 'createdAt',
      node,
      value: frontmatter.createdAt,
    });

    createNodeField({
      name: 'description',
      node,
      value: frontmatter.description || '',
    });

    createNodeField({
      name: 'keywords',
      node,
      value: frontmatter.keywords ? frontmatter.keywords : [],
    });

    createNodeField({
      name: 'isPublished',
      node,
      value: process.env.NODE_ENV === 'development' ? true : frontmatter.isPublished,
    });

    createNodeField({
      name: 'editOnGithubLink',
      node,
      value: `${config.repo.link}/blob/master${node.fileAbsolutePath.replace(slash(__dirname), '')}`,
    });
  }
};
