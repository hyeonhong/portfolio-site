import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(6, 0, 6),
    color: 'white',
    backgroundColor: theme.palette.primary.main
  }
}));

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
        }
      }
    }
  `);

  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        Portfolio.
      </Typography>
      <Typography variant="subtitle1" align="center">
        Created with React | GatsbyJS | Material-UI
      </Typography>
      {/* Copyright */}
      <Typography variant="subtitle1" align="center">
        {'© '}
        {new Date().getFullYear()} {data.site.siteMetadata.author}
      </Typography>
    </footer>
  );
};

export default Footer;
