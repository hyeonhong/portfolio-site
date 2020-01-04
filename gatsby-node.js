const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { postsPerPage } = require('./src/utils/siteConfig');

module.exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode });
    createNodeField({
      node,
      name: 'slug',
      value: slug
    });
  }
};

module.exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
  }

  // Create blog-list pages
  const posts = result.data.allMarkdownRemark.edges;
  const numPages = Math.ceil(posts.length / postsPerPage);
  for (let i = 0; i < numPages; ++i) {
    createPage({
      path: i === 0 ? '/blog' : `/blog/${i + 1}`,
      component: path.resolve('./src/templates/blog-list.js'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1
      }
    });
  }

  // Create blog post pages
  result.data.allMarkdownRemark.edges.forEach((edge, index) => {
    createPage({
      component: path.resolve('./src/templates/blog-post.js'),
      path: '/blog' + edge.node.fields.slug,
      context: {
        slug: edge.node.fields.slug,
        currentPage: Math.floor(index / postsPerPage) + 1
      }
    });
  });
};
