import React from 'react';
import { graphql, navigate } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Button
} from '@material-ui/core';

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
    margin: theme.spacing(8, 0),
    fontFamily: 'Lora'
  },
  postsGrid: {
    marginTop: theme.spacing(4)
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
  },
  button: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.25rem'
    },
    textTransform: 'none'
  }
}));

const BlogList = ({ data, pageContext }) => {
  const classes = useStyles();

  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 <= 1 ? '/blog' : `/blog/${currentPage - 1}`;
  const nextPage = `/blog/${currentPage + 1}`;

  return (
    <Layout>
      <SEO title="Blog" />

      <Container maxWidth="md">
        <Typography variant="h4" color="primary" className={classes.mainHead}>
          — Recent posts
        </Typography>
        <Grid container spacing={4} className={classes.postsGrid}>
          {data.allMarkdownRemark.edges.map((edge) => {
            return (
              <Grid item key={edge.node.id} xs={12}>
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
        <Box marginBottom={10} />
        <Grid container justify="space-between">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              disabled={isFirst}
              onClick={() => navigate(prevPage)}
              className={classes.button}
            >
              ← Newer Posts
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              disabled={isLast}
              onClick={() => navigate(nextPage)}
              className={classes.button}
            >
              Older Posts →
            </Button>
          </Grid>
        </Grid>
        <Box marginBottom={10} />
      </Container>
    </Layout>
  );
};

export default BlogList;

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
