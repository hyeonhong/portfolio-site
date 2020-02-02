import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { makeStyles } from '@material-ui/core/styles';
import {
  Hidden,
  Grid,
  Typography,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Box,
  ButtonBase,
  Paper,
  Link as MuiLink
} from '@material-ui/core';

import SEO from '../components/Seo';
import Layout from '../components/Layout';
import Menu from '../components/Menu';
import Section from '../components/Section';
import { useAllImages } from '../hooks/use-all-images';
import projects from '../content/projects';

import Intro from '../mdx/Intro.mdx';
import Skills from '../mdx/Skills.mdx';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  root: {
    display: 'flex'
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
    // padding: theme.spacing(3)
  },
  heroImage: {
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
  paper: {
    padding: theme.spacing(5),
    width: '90%',
    whiteSpace: 'pre-line'
  },
  paperSkills: {
    padding: theme.spacing(5),
    // display: 'inline-block'
    width: '80%'
  },
  card: {
    height: '100%'
    // flexGrow: 1
    // display: 'flex',
    // flexDirection: 'column'
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  height100vh: {
    height: '100vh'
  }
}));

const IndexPage = () => {
  const classes = useStyles();

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

  // For faster search, build hashtable
  const projectImageSrcs = {};
  const allImages = useAllImages(); // using hook
  allImages.forEach((edge) => {
    projectImageSrcs[edge.node.name] = edge.node.childImageSharp.fluid.src;
  });

  return (
    <Layout>
      <SEO title="Home" />
      <div className={classes.root}>
        <Menu drawerWidth={drawerWidth} />

        <main className={classes.main}>
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

          <Section id="experience" title="EXPERIENCE">
            <Paper elevation={8} className={classes.paper}>
              <Intro />
            </Paper>
          </Section>

          <Section id="projects" title="PROJECTS">
            <Grid container spacing={4}>
              {projects.map((project, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <MuiLink
                      underline="none"
                      color="inherit"
                      href={project.gitSrc}
                      target="_blank"
                      rel="noopener"
                    >
                      <CardMedia
                        className={classes.cardMedia}
                        image={projectImageSrcs[project.imageName]}
                        title={project.heading}
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5">
                          {project.heading}
                        </Typography>
                        <Typography variant="body1">{project.content}</Typography>
                      </CardContent>
                    </MuiLink>
                    <CardActions>
                      <Button
                        variant="outlined"
                        size="medium"
                        color="primary"
                        href={project.gitSrc}
                        target="_blank"
                        rel="noopener"
                      >
                        View it on GitHub
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Section>

          <Section id="skills" title="SKILLS">
            <Paper elevation={4} className={classes.paperSkills}>
              <Skills />
            </Paper>
          </Section>

          <Section id="education" title="EDUCATION">
            <Paper elevation={4} className={classes.paperSkills}>
              <Typography variant="h6" color="primary">
                {'University of Washington'}
              </Typography>
              <Typography variant="body1" color="inherit">
                {'2014.09 - 2017.03'}
              </Typography>
              <br />
              <Typography variant="body1" color="inherit">
                <strong>{'B.S.in Computer Science'}</strong>
              </Typography>
            </Paper>
          </Section>

          <Section id="contact" title="CONTACT">
            <Paper elevation={8} className={classes.paper}>
              contact info
            </Paper>
          </Section>
        </main>
      </div>
    </Layout>
  );
};

export default IndexPage;
