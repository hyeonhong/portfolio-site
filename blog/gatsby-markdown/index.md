---
title: 'How to create a blog with Gatsby using Markdown files'
date: '2019-11-29T21:15:48.271Z'
---

![alt text](./Gatsby_Logo.png 'Gatsby Logo')
<br/>
<br/>
By now, you've probably heard about the popular React framework that is known as Gatsby. It is a static site generator with a lot of features (such as routing) coming out of the box. In this blog, I will go over how to create a blog using Markdown files in Gatsby. Let's get started!

First, install the Gatsby's default starter.

```
gatsby new my-new-blog https://github.com/gatsbyjs/gatsby-starter-default
```

Now, go over to your generated directory (`my-new-blog`, in my case) and install the following packages.

```
npm install gatsby-remark-images gatsby-remark-relative-images gatsby-transformer-remark
```

Those are libraries that we need for processing markdown files.

Under the `src/pages` folder, create a file `blog.js` which creates a component that shows a list of posts. (Notice that the filename is lowercase, and it is how the Gatsby sets the route for that page.)

```javascript
import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

import Layout from '../components/Layout';

const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              date
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <h1>Blog</h1>
      <ol>
        {data.allMarkdownRemark.edges.map((edge) => {
          return (
            <li>
              <Link to={`/blog/${edge.node.fields.slug}`}>
                <h2>{edge.node.frontmatter.title}</h2>
                <p>{edge.node.frontmatter.date}</p>
              </Link>
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

export default BlogPage;
```

Now we need to create a component that generates individual pages of blog in `src/templates/blog.js`.

```javascript
import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
      }
      html
    }
  }
`;

const Blog = (props) => {
  return (
    <Layout>
      <h1>{props.data.markdownRemark.frontmatter.title}</h1>
      <p>{props.data.markdownRemark.frontmatter.date}</p>
      <div dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}></div>
    </Layout>
  );
};

export default Blog;
```

At the root, edit two files named `gatsby-node.js` and `gatsby-config.js` as following.

gatsby-node.js

```javascript
const path = require('path');

module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = path.basename(node.fileAbsolutePath, '.md');

    createNodeField({
      node,
      name: 'slug',
      value: slug
    });
  }
};

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogTemplate = path.resolve('./src/templates/blog.js');
  const res = await graphql(`
    query {
      allMarkdownRemark {
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

  res.data.allMarkdownRemark.edges.forEach((edge) => {
    createPage({
      component: blogTemplate,
      path: `/blog/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug
      }
    });
  });
};
```

gatsby-config.js

```javascript
module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Gatsby Default Starter description`,
    author: `@gatsbyjs`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/blog`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-relative-images',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 750,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
      }
    }
  ]
};
```

Finally, create some markdown files under the folder `src/blog/`. Notice that title and date are wrapped in '---' lines, which is called front matters.

example.md

```
---
title: "Example post"
date: "2019-11-29"
---

This is an example post.
```

example-with-photo.md

```
---
title: "Example post with photo"
date: "2019-11-29"
---

This is an example post with photo.
![alt-text](https://source.unsplash.com/random "unsplash photo")
```

And you're all set! On the command line, run the following to launch the website in the local environment.

```
npm run develop
```

Go to `http://localhost:8000/blog` and check if everything is working correctly.

Since there is no css styles applied yet, the page doesn't look too pretty.

At least now you have your blog up and running!