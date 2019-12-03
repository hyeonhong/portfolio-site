import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    minWidth: 75,
    minHeight: 75,
    borderRadius: '50%'
  }
}));

const Bio = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "profile-photo.jpg" }) {
        childImageSharp {
          fixed(width: 75, height: 75) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
        }
      }
    }
  `);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Img fixed={data.file.childImageSharp.fixed} className={classes.avatar} />
      <Box marginRight={4} />
      <Typography variant="body1" color="textPrimary">
        Written by <strong>{data.site.siteMetadata.author}</strong>, who strives to achieve the best
        in all areas, and is always open and eager to learn new skills and push himself in new ways.
      </Typography>
    </div>
  );
};

export default Bio;
