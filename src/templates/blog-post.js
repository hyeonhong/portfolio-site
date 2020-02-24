import React from 'react';
import { graphql, navigate } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Divider, Box, Grid, Button } from '@material-ui/core';
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
        fontSize: '1.2rem'
        // backgroundColor: '#f6f8fa'
      },
      fontSize: '1.125rem'
    },
    '& ul': {
      '& li': {
        fontSize: '1rem'
      }
    },
    '& pre': {
      fontSize: '1rem'
      // backgroundColor: '#f6edfa'
    },
    '& code': {
      fontSize: '1rem'
    }
  },
  button: {
    // fontSize: '1.25rem',
    textTransform: 'none'
  }
}));

const BlogPost = ({ data, pageContext }) => {
  const slug = data.markdownRemark.fields.slug;
  const title = data.markdownRemark.frontmatter.title;
  const date = data.markdownRemark.frontmatter.date;
  const html = data.markdownRemark.html;

  const { currentPage } = pageContext;
  const mainPage = currentPage === 1 ? '/blog' : `/blog/${currentPage}`;

  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: {
      identifier: slug,
      title
    }
  };

  const classes = useStyles();

  return (
    <Layout>
      <SEO title={title} />

      <Container maxWidth="md">
        <Typography variant="h4" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="body2" className={classes.date}>
          {date}
        </Typography>
        <div dangerouslySetInnerHTML={{ __html: html }} className={classes.html} />
        <Box marginBottom={8} />
        <Divider />
        <Box marginBottom={3} />
        <Bio />
        <Box marginBottom={3} />
        <Divider />
        <Box marginBottom={6} />

        <Grid container justify="center">
          <Button
            variant="contained"
            color="primary"
            align="center"
            onClick={() => navigate(mainPage)}
            className={classes.button}
          >
            ← Back to List
          </Button>
        </Grid>

        <Box marginTop={16} />
        <DiscussionEmbed {...disqusConfig} />
        <Box marginBottom={16} />
      </Container>
    </Layout>
  );
};

export default BlogPost;

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
