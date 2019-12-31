import React from 'react';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import Img from 'gatsby-image';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Container,
  Divider,
  Hidden,
  Grid,
  Drawer,
  Typography,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Box,
  ButtonBase
} from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import LayersIcon from '@material-ui/icons/Layers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
// import { faFile } from '@fortawesome/free-regular-svg-icons';

import NewLayout from './NewLayout';
import SEO from './Seo';
import projects from '../content/projects';

const useStyles = makeStyles((theme) => ({
  // '@global': {
  //   body: {
  //     backgroundColor: theme.palette.common.white
  //   }
  // },
  root: {
    height: '100vh',
    backgroundColor: 'yellow'
  }
}));

const Section = ({ id }) => {
  const data = useStaticQuery(graphql`
    query {
      frontMobile: file(relativePath: { eq: "front-mobile.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      frontMedium: file(relativePath: { eq: "front-medium.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      frontDesktop: file(relativePath: { eq: "front-desktop.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 2000, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      profileImage: file(relativePath: { eq: "profile-photo.jpg" }) {
        childImageSharp {
          fixed(width: 200, height: 200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  const frontSources = [
    data.frontMobile.childImageSharp.fluid,
    {
      ...data.frontMedium.childImageSharp.fluid,
      media: '(min-width: 768px) and (max-width: 999px)'
    },
    {
      ...data.frontDesktop.childImageSharp.fluid,
      media: '(min-width: 1000px)'
    }
  ];

  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box className={classes.root} id={id}>
      <Typography variant="h6">what</Typography>
    </Box>
  );
};

export default Section;
