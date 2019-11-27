import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';

import Header from './Header';
import Footer from './Footer';
import theme from '../theme';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  filler: {
    flex: 1
  }
}));

const Layout = ({ children, headerTabValue }) => {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Helmet>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <Header headerTabValue={headerTabValue} />
          {children}
          <div className={classes.filler}></div>
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
