import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Paper, Grid, Box } from '@material-ui/core';

import Link from '../components/Link';
import Layout from '../components/Layout';
import SEO from '../components/Seo';

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  mainHead: {
    margin: theme.spacing(8, 0)
  },
  postsGrid: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column'
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[50],
    '&:hover': {
      background: '#f1f1f1'
    }
  },
  title: {
    fontWeight: 500
  }
}));

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

  const classes = useStyles();

  return (
    <Layout headerTabValue={1}>
      <SEO title="Blog" />

      <Container maxWidth="md">
        <Typography variant="h4" color="primary" className={classes.mainHead}>
          Posts
        </Typography>
        <Grid container spacing={4} className={classes.postsGrid}>
          {data.allMarkdownRemark.edges.map((edge) => {
            return (
              <Grid item key={edge.node.fields.slug}>
                <Link to={`/blog/${edge.node.fields.slug}`} underline="none">
                  <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h5" color="inherit" gutterBottom className={classes.title}>
                      {edge.node.frontmatter.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {edge.node.frontmatter.date}
                    </Typography>
                  </Paper>
                </Link>
              </Grid>
            );
          })}
        </Grid>
        <Box marginBottom={20} />
      </Container>
    </Layout>
  );
};

export default BlogPage;
