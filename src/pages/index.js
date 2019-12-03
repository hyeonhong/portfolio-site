import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Avatar,
  Typography,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Box,
  Link as MuiLink
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
// import { faFile } from '@fortawesome/free-regular-svg-icons';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import projects from '../content/projects';

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  avatar: {
    margin: 50,
    width: 200,
    height: 200
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
  }
}));

const IndexPage = () => {
  const classes = useStyles();

  return (
    <Layout headerTabValue={0}>
      <SEO title="Home" />
      <Container maxWidth="md">
        <div className={classes.heroContent}>
          <Grid container justify="center" alignItems="center">
            <Avatar
              alt="profile-photo"
              src="/images/profile-photo.jpg"
              className={classes.avatar}
            />
          </Grid>
          <Typography variant="h6" align="center" color="textSecondary" paragraph>
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
                      // title="Image title"
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
      <Box marginBottom={24} />
    </Layout>
  );
};

export default IndexPage;
