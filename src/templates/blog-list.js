import React from 'react';
import { graphql, navigate } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Paper, Grid, Box } from '@material-ui/core';
import Pagination from 'material-ui-flat-pagination';

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
  }
}));

const BlogPage = ({ data, pageContext }) => {
  const classes = useStyles();
  const [offset, setOffset] = React.useState(pageContext.skip);

  const handleClick = (event, newOffset) => {
    const newPage = newOffset / pageContext.limit + 1;
    const newPath = newPage === 1 ? '/blog' : `/blog/${newPage}/`;
    navigate(newPath);
    setOffset(newOffset);
  };

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
              <Grid item key={edge.node.fields.slug} xs={12}>
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
        <Pagination
          align="center"
          limit={pageContext.limit}
          offset={offset}
          total={pageContext.numPages * pageContext.limit}
          onClick={handleClick}
        />
        <Box marginBottom={10} />
      </Container>
    </Layout>
  );
};

export default BlogPage;

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
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
