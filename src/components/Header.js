import React from 'react';
import { useStaticQuery, navigate, graphql } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  MenuList,
  MenuItem
} from '@material-ui/core';

import Link from '../components/Link';

const useStyles = makeStyles((theme) => ({
  title: {
    justifyContent: 'start',
    textTransform: 'none',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem'
    },
    padding: 0
  },
  filler: {
    flexGrow: 1
  },
  menuList: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0
  },
  menuItem: {
    // display: 'flex',
    justifyContent: 'center',
    minWidth: 100,
    borderRadius: 8,
    [theme.breakpoints.down('xs')]: {
      padding: 8,
      minWidth: 50
    }
  }
}));

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
          title
        }
      }
    }
  `);

  const tabs = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' }
  ];

  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar variant="dense" disableGutters>
          <Button onClick={() => navigate('/')} color="inherit" className={classes.title}>
            <Typography variant="h6" color="inherit">
              {data.site.siteMetadata.title}
            </Typography>
          </Button>
          <Box className={classes.filler} />
          <MenuList className={classes.menuList}>
            {tabs.map((tab) => (
              <MenuItem
                key={tab.label}
                button
                onClick={() => navigate(tab.path)}
                className={classes.menuItem}
              >
                <Typography variant="inherit">{tab.label}</Typography>
              </MenuItem>
            ))}
          </MenuList>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
