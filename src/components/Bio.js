import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Typography } from '@material-ui/core';

const Bio = () => {
  const data = useStaticQuery(graphql`
    query {
      avatar: file(relativePath: { eq: "profile-photo.jpg" }) {
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

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Img
        fixed={data.avatar.childImageSharp.fixed}
        style={{
          marginRight: '2rem',
          minWidth: 75,
          borderRadius: '100%'
        }}
      />
      <Typography variant="body1" color="textPrimary">
        Written by <strong>{data.site.siteMetadata.author}</strong>, who strives to achieve the best
        in all areas, and is always open and eager to learn new skills and push himself in new ways.
      </Typography>
    </div>
  );
};

export default Bio;
