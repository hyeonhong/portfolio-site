import React from 'react';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import {
  Hidden,
  AppBar,
  Toolbar,
  Divider,
  Typography,
  Drawer,
  Box,
  ButtonBase
} from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const DrawerList = React.lazy(() => import('./DrawerList'));

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {},
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      // display: 'none'
    }
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  }
}));

const IndexPage = () => {
  const isSSR = typeof window === 'undefined';

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

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Hidden smUp>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {data.site.siteMetadata.author}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {!isSSR && (
            <React.Suspense fallback={<div />}>
              <DrawerList />
            </React.Suspense>
          )}
        </Drawer>
      </Hidden>
      <Hidden xsDown>
        <Drawer
          variant="permanent"
          anchor="left"
          classes={{
            paper: classes.drawerPaper
          }}
          className={classes.drawer}
        >
          <Box marginBottom={5} />
          <ButtonBase
            // component="div"
            disableRipple
            onClick={() => navigate('/')}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <Typography variant="h5" align="center" color="primary" noWrap>
              {data.site.siteMetadata.author}
            </Typography>
            <Box marginBottom={1} />

            <Typography variant="body1" align="center" noWrap>
              {`Full Stack Developer`}
            </Typography>
          </ButtonBase>
          <Box marginBottom={5} />
          <Divider />
          {!isSSR && (
            <React.Suspense fallback={<div />}>
              <DrawerList />
            </React.Suspense>
          )}
        </Drawer>
      </Hidden>
    </>
  );
};

export default IndexPage;
