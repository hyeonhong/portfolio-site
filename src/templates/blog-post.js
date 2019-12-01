import React from 'react';
import { graphql } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Divider, Box, Grid } from '@material-ui/core';
import { DiscussionEmbed } from 'disqus-react';

import Layout from '../components/Layout';
import Link from '../components/Link';
import SEO from '../components/Seo';
import Bio from '../components/Bio';

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  title: {
    margin: theme.spacing(8, 0, 1),
    fontWeight: 700
  },
  date: {
    marginBottom: theme.spacing(4)
  },
  html: {
    '& p': {
      '& code': {
        fontSize: '1.125rem',
        backgroundColor: '#f6f8fa'
      },
      fontSize: '1.125rem'
    },
    '& ul': {
      '& li': {
        fontSize: '1.125rem'
      }
    },
    '& pre': {
      fontSize: '1.125rem',
      backgroundColor: '#f6edfa'
    }
  }
}));

const Blog = (props) => {
  const slug = props.data.markdownRemark.fields.slug;
  const title = props.data.markdownRemark.frontmatter.title;
  const date = props.data.markdownRemark.frontmatter.date;
  const html = props.data.markdownRemark.html;

  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: {
      identifier: slug,
      title
    }
  };

  const classes = useStyles();

  return (
    <Layout headerTabValue={1}>
      <SEO title={title} />

      <Container maxWidth="md">
        <Typography variant="h4" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="body2" className={classes.date}>
          {date}
        </Typography>
        <div dangerouslySetInnerHTML={{ __html: html }} className={classes.html} />
        <Box marginTop={8} />
        <Divider />
        <Box marginTop={3} />
        <Bio />
        <Box marginTop={3} />

        <Grid align="center">
          <Typography variant="h6">
            <Link to="/blog" underline="none" color="primary">
              Go Back to List
            </Link>
          </Typography>
        </Grid>

        <Box marginTop={16} />
        <DiscussionEmbed {...disqusConfig} />
        <Box marginBottom={24} />
      </Container>
    </Layout>
  );
};

export default Blog;

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      html
      fields {
        slug
      }
    }
  }
`;
