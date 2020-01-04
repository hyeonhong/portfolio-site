import React from 'react';
import PropTypes from 'prop-types';
import { graphql, navigate } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Divider, Box, Grid, Button } from '@material-ui/core';
import { DiscussionEmbed } from 'disqus-react';

import Layout from '../components/Layout';
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
    '& img': {
      maxWidth: '100%'
    },
    '& p': {
      '& code': {
        fontSize: '1rem',
        backgroundColor: '#f6f8fa'
      },
      fontSize: '1rem'
    },
    '& ul': {
      '& li': {
        fontSize: '1rem'
      }
    },
    '& pre': {
      fontSize: '1rem',
      backgroundColor: '#f6edfa'
    }
  },
  button: {
    // fontSize: '1.25rem',
    textTransform: 'none'
  }
}));

const BlogPost = ({ data, pageContext }) => {
  const { ghostPost } = data;
  const { slug, title, published_at, html } = ghostPost;

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
          {published_at}
        </Typography>
        {/* The main post content */}
        <section dangerouslySetInnerHTML={{ __html: html }} className={classes.html} />
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
            ← Back to Main
          </Button>
        </Grid>

        <Box marginTop={16} />
        <DiscussionEmbed {...disqusConfig} />
        <Box marginBottom={16} />
      </Container>
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    ghostPost: PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      published_at: PropTypes.string.isRequired,
      html: PropTypes.string.isRequired
      // feature_image: PropTypes.string
    }).isRequired
  }).isRequired
};

export default BlogPost;

export const query = graphql`
  query($slug: String!) {
    ghostPost(slug: { eq: $slug }) {
      slug
      title
      published_at(formatString: "MMMM DD, YYYY")
      html
    }
  }
`;
