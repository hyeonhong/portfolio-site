import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
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
  ButtonBase,
  Paper
} from '@material-ui/core';

import NewLayout from '../components/NewLayout';
import SEO from '../components/Seo';
import Menu from '../components/Menu';
import Banner from '../components/Banner';
import projects from '../content/projects';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  // '@global': {
  //   body: {
  //     backgroundColor: theme.palette.common.white
  //   }
  // },
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1
    // padding: theme.spacing(3)
  },
  heroImage: {
    // margin: 50,
    // width: 200,
    // height: 200,

    height: '100vh'
  },
  foreground: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.4)',
    height: '100vh',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  toolbar: theme.mixins.toolbar,
  section: {
    height: '100vh',
    backgroundColor: 'yellow'
  },
  sectionContent: {
    margin: theme.spacing(8, 0, 6)
  },
  paper: {
    // display: 'flex',
    // justifyContent: 'center',
    padding: theme.spacing(3),
    maxWidth: 768
  }

  // gridTitle: {
  //   padding: theme.spacing(8, 0, 6)
  // },
  // cardGrid: {
  //   paddingTop: theme.spacing(8)
  // },
  // card: {
  //   height: '100%',
  //   display: 'flex',
  //   flexDirection: 'column'
  // },
  // cardMedia: {
  //   paddingTop: '56.25%' // 16:9
  // },
  // cardContent: {
  //   flexGrow: 1
  // },
}));

const IndexPage = () => {
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

  return (
    <NewLayout>
      <SEO title="Home" />
      <div className={classes.root}>
        <Menu />

        <main className={classes.content}>
          <Img fluid={frontSources} className={classes.heroImage} alt="front-image" />
          <Box className={classes.foreground}>
            <Hidden smUp>
              <div className={classes.toolbar} />
            </Hidden>

            <Typography variant="h2" color="inherit">
              {`Don't cry because it's over.`}
              <br />
              {`Be happy because it happened.`}
            </Typography>
          </Box>

          <section id="one" className={classes.section}>
            <Banner title={'EXPERIENCE'} />
            <Grid container justify="center" alignItems="center" className={classes.sectionContent}>
              <Box boxShadow={1}>
                <Paper className={classes.paper}>
                  <Typography variant="h6" color="inherit">
                    {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse adipisci nulla inventore eveniet. Illum voluptate eaque hic reprehenderit provident possimus rerum aperiam, corrupti tempora at vitae esse distinctio saepe sunt assumenda. Aliquid esse expedita sed aliquam ab quasi voluptate sapiente animi, maxime optio dignissimos! Sapiente corporis voluptate magni hic voluptates.`}
                  </Typography>
                </Paper>
              </Box>
            </Grid>
          </section>
          <section id="two" className={classes.section}>
            <Banner title={'PROJECTS'} />
          </section>
          <section id="three" className={classes.section}>
            <Banner title={'SKILLS'} />
          </section>
          <section id="four" className={classes.section}>
            <Banner title={'EDUCATION'} />
          </section>
        </main>
      </div>
    </NewLayout>
  );
};

export default IndexPage;
