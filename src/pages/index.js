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
  IconButton,
  Link as MuiLink
} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faDownload, faEnvelope } from '@fortawesome/free-solid-svg-icons';
// import { faFile } from '@fortawesome/free-regular-svg-icons';

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
    backgroundColor: 'rgba(0,0,0,0.0)',
    minHeight: '100vh',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  foregroundText: {
    position: 'absolute',
    top: '40%',
    marginLeft: theme.spacing(20),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(5)
    }
  },
  toolbar: theme.mixins.toolbar,
  paper: {
    padding: theme.spacing(5),
    width: '90%',
    whiteSpace: 'pre-line'
  },
  skillsPaper: {
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
  resumePaper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(5),
    width: '90%'
  },
  resumeButton: {
    margin: theme.spacing(3),
    fontSize: '1.125rem',
    textTransform: 'none'
  },
  contactPaper: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    paddingLeft: theme.spacing(5),
    width: '90%',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(2),
      width: '100%'
    }
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  contactIcon: {
    color: 'white',
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(4)
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
          <div className={classes.heroImage}>
            <Img fluid={frontSources} style={{ height: '100%' }} alt="front-image" />
          </div>
          <div className={classes.foreground}>
            <Hidden smUp>
              <div className={classes.toolbar} />
            </Hidden>
            <div className={classes.foregroundText}>
              <Typography variant="h2" color="inherit">
                {`Strive to be better everyday.`}
              </Typography>
            </div>
          </div>

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
            <Paper elevation={4} className={classes.skillsPaper}>
              <Skills />
            </Paper>
          </Section>

          <Section id="education" title="EDUCATION">
            <Paper elevation={4} className={classes.skillsPaper}>
              <Typography variant="h5" color="primary">
                {'University of Washington'}
              </Typography>
              <Typography variant="body1" color="inherit">
                {'2014.09 - 2017.03'}
              </Typography>
              <br />
              <Typography variant="h6" color="inherit">
                <strong>{'B.S.in Computer Science'}</strong>
              </Typography>
            </Paper>
          </Section>

          <Section id="resume" title="RESUME">
            <Paper elevation={4} className={classes.resumePaper}>
              <Button
                variant="contained"
                color="primary"
                className={classes.resumeButton}
                endIcon={<FontAwesomeIcon icon={faDownload} />}
                href="HyeonHong-English.pdf"
                target="_blank"
              >
                Resume - English
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: '#6e5494', color: '#fff' }}
                className={classes.resumeButton}
                endIcon={<FontAwesomeIcon icon={faDownload} />}
                href="HyeonHong-Korean.pdf"
                target="_blank"
              >
                Resume - Korean
              </Button>
            </Paper>
          </Section>

          <Section id="contact" title="CONTACT" fullHeight>
            <Paper elevation={8} className={classes.contactPaper}>
              <div className={classes.contactItem}>
                <IconButton className={classes.contactIcon}>
                  <FontAwesomeIcon icon={faEnvelope} />
                </IconButton>
                <Typography
                  variant="h6"
                  component={ButtonBase}
                  href="mailto:hyeonshong@gmail.com"
                  target="_blank"
                  rel="noopener"
                >
                  hyeonshong@gmail.com
                </Typography>
              </div>
              <div className={classes.contactItem}>
                <IconButton className={classes.contactIcon}>
                  <FontAwesomeIcon icon={faGithub} />
                </IconButton>
                <Typography
                  variant="h6"
                  component={ButtonBase}
                  href="https://github.com/hyeonhong"
                  target="_blank"
                  rel="noopener"
                >
                  github.com/hyeonhong
                </Typography>
              </div>
              <div className={classes.contactItem}>
                <IconButton className={classes.contactIcon}>
                  <FontAwesomeIcon icon={faLinkedin} />
                </IconButton>
                <Typography
                  variant="h6"
                  component={ButtonBase}
                  href="https://linkedin.com/in/hyeonhong"
                  target="_blank"
                  rel="noopener"
                >
                  linkedin.com/in/hyeonhong
                </Typography>
              </div>
            </Paper>
          </Section>
        </main>
      </div>
    </Layout>
  );
};

export default IndexPage;
