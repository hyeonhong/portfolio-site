import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
  }
}));

const Banner = ({ title }) => {
  const classes = useStyles();

  return (
    <Typography variant="h4" noWrap className={classes.root}>
      {title}
    </Typography>
  );
};

export default Banner;
