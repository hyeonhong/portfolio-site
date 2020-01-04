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
import { useAllImages } from '../hooks/use-all-images';
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
    margin: theme.spacing(8, 0, 6)
  },
  paper: {
    // display: 'flex',
    // justifyContent: 'center',
    padding: theme.spacing(3),
    maxWidth: 768
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
            <Container maxWidth="md" className={classes.sectionContent}>
              <Grid container spacing={4}>
                {projects.map((project, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardActionArea>
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
                      </CardActionArea>
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

          <section id="three" className={classes.section}>
            <Banner title={'SKILLS'} />
            <div className={classes.sectionContent}></div>
          </section>

          <section id="four" className={classes.section}>
            <Banner title={'EDUCATION'} />
            <div className={classes.sectionContent}></div>
          </section>
        </main>
      </div>
    </NewLayout>
  );
};

export default IndexPage;
