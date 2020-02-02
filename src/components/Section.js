import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    // height: '100vh',
    backgroundColor: 'yellow'
  },
  banner: {
    width: '100%',
    padding: theme.spacing(3),
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    margin: theme.spacing(10, 0, 10)
  }
}));

const Section = ({ id, title, children }) => {
  const classes = useStyles();

  return (
    <section id={id} className={classes.root}>
      <Typography variant="h4" noWrap className={classes.banner}>
        {title}
      </Typography>
      <Container maxWidth="md" className={classes.content}>
        {children}
      </Container>
    </section>
  );
};

export default Section;
