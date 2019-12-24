import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import { Container, AppBar, Toolbar, Typography, Tabs, Tab } from '@material-ui/core';
import Link from '../components/Link';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    fontFamily: 'Montserrat'
  },
  titleLink: {
    color: theme.palette.primary.contrastText
  },
  tab: {
    fontSize: '1rem',
    minWidth: 100,
    width: 100
  }
}));

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
        }
      }
    }
  `);

  const allTabs = [
    { label: 'Home', path: '/old' },
    { label: 'Blog', path: '/blog' }
  ];
  const currentIndex = allTabs.findIndex((tab) => tab.path === window.location.pathname);

  const classes = useStyles();
  const [value, setValue] = React.useState(currentIndex);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="md">
        <Toolbar variant="dense" disableGutters>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" underline="none" className={classes.titleLink}>
              {data.site.siteMetadata.author}
            </Link>
          </Typography>
          <Tabs
            value={value}
            onChange={handleChange}
            // TabIndicatorProps={{
            //   style: {
            //     backgroundColor: '#19857b'
            //   }
            // }}
          >
            {allTabs.map((tab) => (
              <Tab
                key={tab.label}
                label={tab.label}
                to={tab.path}
                underline="none"
                component={Link}
                className={classes.tab}
              />
            ))}
          </Tabs>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
