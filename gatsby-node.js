const path = require('path');
const { postsPerPage } = require('./src/utils/siteConfig');

module.exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allGhostPost(sort: { fields: published_at, order: DESC }) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
  }

  // Create blog-list pages
  const posts = result.data.allGhostPost.edges;
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
  result.data.allGhostPost.edges.forEach((edge, index) => {
    createPage({
      component: path.resolve('./src/templates/blog-post.js'),
      path: `/blog/${edge.node.slug}`,
      context: {
        slug: edge.node.slug,
        currentPage: Math.floor(index / postsPerPage) + 1
      }
    });
  });
};
