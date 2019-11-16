import React from 'react';
// import { Link } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import { Container, AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

// import Image from '../components/Image';
import Layout from '../components/Layout';
import SEO from '../components/Seo';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2)
  },
  menuButton: {
    color: theme.spacing(10)
  }
}));

const IndexPage = () => {
  const classes = useStyles();

  return (
    <Layout>
      <SEO title="Home" />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>

          <Button variant="contained" color="primary">
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </Button>

          <Typography variant="h6">News</Typography>
          <Button variant="contained" color="black" className={classes.button}>
            item1
          </Button>
        </Toolbar>
      </AppBar>
    </Layout>
  );
};

export default IndexPage;
