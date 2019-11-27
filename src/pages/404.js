import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from '../components/Link';

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  title: {
    flexGrow: 1
  },
  tab: {
    fontSize: '1rem',
    minWidth: 100,
    width: 100
  },
  heroContent: {
    margin: theme.spacing(20)
  },
  link: {
    margin: theme.spacing(1)
  }
}));

const NotFoundPage = () => {
  const classes = useStyles();

  return (
    <Layout>
      <SEO title="404: Not found" />
      <div className={classes.heroContent}>
        <Container component="main" maxWidth="sm">
          <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
            NOT FOUND
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            You just hit a route that doesn't exist...
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            <Link to="/" color="primary">
              Go to the main page
            </Link>
          </Typography>
        </Container>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
