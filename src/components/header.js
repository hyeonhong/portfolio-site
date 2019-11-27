import React from 'react';
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

const Header = ({ headerTabValue }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(headerTabValue);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="md">
        <Toolbar variant="dense" disableGutters>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" underline="none" className={classes.titleLink}>
              Hyeon Hong
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
            <Tab label="Home" to="/" underline="none" component={Link} className={classes.tab} />
            <Tab
              label="Blog"
              to="/blog"
              underline="none"
              component={Link}
              className={classes.tab}
            />
          </Tabs>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
