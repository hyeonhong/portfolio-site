import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

import Header from './Header';
import Footer from './Footer';
// import './Layout.css';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Helmet>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
        {children}
        {/* <Footer /> */}
      </ThemeProvider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
