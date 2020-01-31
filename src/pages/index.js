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
  Paper,
  Link as MuiLink
} from '@material-ui/core';

import SEO from '../components/Seo';
import NewLayout from '../components/NewLayout';
import Menu from '../components/Menu';
import Banner from '../components/Banner';
import { useAllImages } from '../hooks/use-all-images';
import projects from '../content/projects';
import skills from '../content/skills';

import Intro from '../mdx/intro.mdx';

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
  main: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // height: '100vh',
    backgroundColor: 'yellow'
  },
  sectionContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(10, 0, 10)
  },
  skillsSectionContent: {
    display: 'grid',
    gridAutoFlow: 'row',
    gridRowGap: theme.spacing(4),
    justifyContent: 'center',
    margin: theme.spacing(10, 0, 10)
  },
  paper: {
    // display: 'flex',
    // justifyContent: 'center',
    padding: theme.spacing(3),
    maxWidth: 768,
    whiteSpace: 'pre-line'
  },
  skillsPaper: {
    padding: theme.spacing(5),
    width: 768,
    whiteSpace: 'pre-line'
  },
  educationPaper: {
    padding: theme.spacing(3),
    width: 768,
    whiteSpace: 'pre-line'
  },
  projectGrid: {
    maxWidth: 960
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
    <NewLayout>
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

          <section id="experience" className={classes.section}>
            <Banner title={'EXPERIENCE'} />
            <Container maxWidth="md" className={classes.sectionContent}>
              <Paper elevation={8} className={classes.paper}>
                <Intro />
              </Paper>
            </Container>
          </section>

          <section id="projects" className={classes.section}>
            <Banner title={'PROJECTS'} />
            <Container maxWidth="md" className={classes.sectionContent}>
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
            </Container>
          </section>

          <section id="skills" className={classes.section}>
            <Banner title={'SKILLS'} />
            <Container maxWidth="md" className={classes.skillsSectionContent}>
              {skills.map((category, index) => (
                <Paper key={index} elevation={4} className={classes.skillsPaper}>
                  <Typography variant="h5" color="primary">
                    {category.split('\n')[0]}
                  </Typography>
                  <Typography variant="h6" color="textPrimary">
                    {category.split('\n')[1]}
                  </Typography>
                </Paper>
              ))}
            </Container>
          </section>

          <section id="education" className={classes.section}>
            <Banner title={'EDUCATION'} />
            <Container maxWidth="md" className={classes.sectionContent}>
              <Paper elevation={4} className={classes.educationPaper}>
                <Typography variant="h5" color="primary">
                  {'University of Washington'}
                </Typography>
                <Typography variant="body1" color="inherit">
                  {'2014-2017'}
                </Typography>
                <Typography variant="h6" color="inherit">
                  {'\nB.S. in Computer Science'}
                </Typography>
              </Paper>
            </Container>
          </section>

          <section id="contact" className={`${classes.section} ${classes.height100vh}`}>
            <Banner title={'CONTACT'} />
            <Container maxWidth="md" className={classes.sectionContent}>
              <Paper elevation={8} className={classes.paper}>
                contact info
              </Paper>
            </Container>
          </section>
        </main>
      </div>
    </NewLayout>
  );
};

export default IndexPage;
