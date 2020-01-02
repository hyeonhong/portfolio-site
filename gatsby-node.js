const path = require('path');

module.exports.createPages = async ({ graphql, actions }) => {
  const POSTS_PER_PAGE = 4;

  const { createPage } = actions;
  const result = await graphql(`
    query {
      allContentfulBlogPost(sort: { fields: publishedDate, order: DESC }, limit: 1000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  // Create blog-list pages
  const posts = result.data.allContentfulBlogPost.edges;
  const numPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  for (let i = 0; i < numPages; ++i) {
    createPage({
      path: i === 0 ? '/blog' : `/blog/${i + 1}`,
      component: path.resolve('./src/templates/blog-list.js'),
      context: {
        limit: POSTS_PER_PAGE,
        skip: i * POSTS_PER_PAGE,
        numPages,
        currentPage: i + 1
      }
    });
  }

  // Create blog post pages
  result.data.allContentfulBlogPost.edges.forEach((edge, index) => {
    createPage({
      component: path.resolve('./src/templates/blog-post.js'),
      path: `/blog/${edge.node.slug}`,
      context: {
        slug: edge.node.slug,
        currentPage: Math.floor(index / POSTS_PER_PAGE) + 1
      }
    });
  });
};
