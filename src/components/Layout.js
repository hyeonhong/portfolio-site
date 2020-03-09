import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';

// import Header from './Header';
// import Footer from './Footer';
import theme from '../theme';

const { fontFamily } = require('../utils/siteConfig');

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // flexDirection: 'column',
    // minHeight: '100vh'
  },
  filler: {
    flex: 1
  }
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  const fontString = JSON.stringify(fontFamily)
    .replace(/\],/g, '|') // replace ], with |
    .replace(/[\[\]\{\}\"]/g, '') // Remove []{}"
    .replace(/ /g, '+'); // replace ' ' with +

  return (
    <>
      <Helmet>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css?family=${fontString}&display=swap`}
        />
      </Helmet>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          {/* <Header /> */}
          {children}
          {/* <div className={classes.filler}></div> */}
          {/* <Footer /> */}
        </div>
      </ThemeProvider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
