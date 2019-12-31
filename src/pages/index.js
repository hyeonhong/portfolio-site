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

import NewLayout from '../components/NewLayout';
import SEO from '../components/Seo';
import projects from '../content/projects';

const DrawerList = React.lazy(() => import('../components/DrawerList'));

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  // '@global': {
  //   body: {
  //     backgroundColor: theme.palette.common.white
  //   }
  // },
  avatar: {
    margin: 50,
    width: 200,
    height: 200,
    borderRadius: '50%'
  },
  button: {
    marginRight: theme.spacing(2),
    fontSize: '1.125rem',
    textTransform: 'none'
  },
  buttons: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8)
  },
  // link: {
  //   background: '#fff',
  //   '&:hover': {
  //     background: '#f1f1f1'
  //   }
  // },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5)
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6)
  },
  description: {
    fontFamily: 'Lato'
  },
  gridTitle: {
    padding: theme.spacing(8, 0, 6)
  },
  cardGrid: {
    paddingTop: theme.spacing(8)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  },

  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      // display: 'none'
    }
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1
    // padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar,
  item: {
    height: '100vh',
    backgroundColor: 'red'
  },
  frontImage: {
    // margin: 50,
    // width: 200,
    // height: 200,

    height: '100vh'
  },
  foregroundText: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    width: `calc(100% - ${drawerWidth}px)`,
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.4)',
    color: 'white'
  }
}));

const IndexPage = () => {
  const isSSR = typeof window === 'undefined';

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
    <NewLayout>
      <div className={classes.root}>
        <SEO title="Home" />
        <Hidden smUp>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Hyeon Hong - Full Stack Developer
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {!isSSR && (
              <React.Suspense fallback={<div />}>
                <DrawerList />
              </React.Suspense>
            )}
          </Drawer>
        </Hidden>
        <Hidden xsDown>
          <Drawer
            variant="permanent"
            anchor="left"
            classes={{
              paper: classes.drawerPaper
            }}
            className={classes.drawer}
          >
            <Box marginBottom={5} />
            <ButtonBase
              // component="div"
              disableRipple
              onClick={() => navigate('/')}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <Typography variant="h5" align="center" noWrap>
                {`Hyeon Hong`}
              </Typography>
              <Box marginBottom={1} />

              <Typography variant="body1" align="center" noWrap>
                {`Full Stack Developer`}
              </Typography>
            </ButtonBase>
            <Box marginBottom={5} />

            {!isSSR && (
              <React.Suspense fallback={<div />}>
                <DrawerList />
              </React.Suspense>
            )}
          </Drawer>
        </Hidden>

        <main className={classes.content}>
          <Img fluid={frontSources} className={classes.frontImage} alt="front-image" />
          <Typography variant="h2" className={classes.foregroundText}>
            hello world
          </Typography>

          <Typography id="one" paragraph className={classes.item}>
            one
          </Typography>
          <Typography id="two" paragraph className={classes.item}>
            two
          </Typography>
          <Typography id="three" paragraph className={classes.item}>
            three
          </Typography>
          <Typography id="four" paragraph className={classes.item}>
            four
          </Typography>
        </main>
      </div>
      {/*       
      <Container maxWidth="md">
        <div className={classes.heroContent}>
          <Grid container justify="center" alignItems="center">
            <Img
              fixed={data.file.childImageSharp.fixed}
              className={classes.avatar}
              alt="profile-photo"
            />
          </Grid>
          <Typography
            variant="h6"
            align="center"
            color="textPrimary"
            paragraph
            className={classes.description}
          >
            Software Engineer
            <br />
            Full Stack Developer
            <br />
            <br />
            React | Node.js
            <br />
            AWS Lambda | Serverless
          </Typography>
        </div>
        <Grid
          container
          justify="center"
          alignItems="center"
          // direction="column"
          className={classes.buttons}
        >
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<FontAwesomeIcon icon={faDownload} />}
            href="HyeonHong-English.pdf"
            target="_blank"
          >
            Resume
          </Button>
          <Button
            variant="contained"
            href="https://github.com/hyeonhong"
            target="_blank"
            rel="noopener"
            className={classes.button}
            startIcon={<FontAwesomeIcon icon={faGithub} />}
            style={{
              color: '#ffffff',
              backgroundColor: '#6e5494'
            }}
          >
            GitHub
          </Button>
          <Button
            variant="contained"
            href="https://www.linkedin.com/in/hyeonhong/"
            target="_blank"
            rel="noopener"
            className={classes.button}
            startIcon={<FontAwesomeIcon icon={faLinkedin} />}
            style={{
              color: '#ffffff',
              backgroundColor: '#0077b5'
            }}
          >
            LinkedIn
          </Button>
        </Grid>
      </Container>

      <Container className={classes.cardGrid} maxWidth="md">
        <Typography variant="h5" className={classes.gridTitle}>
          Projects
        </Typography>
        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardActionArea>
                  <MuiLink href={project.imageSrc}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={project.imageSrc}
                      title={project.heading}
                    />
                  </MuiLink>
                </CardActionArea>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {project.heading}
                  </Typography>
                  <Typography>{project.content}</Typography>
                </CardContent>
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
      <Box marginBottom={24} /> */}
    </NewLayout>
  );
};

export default IndexPage;
