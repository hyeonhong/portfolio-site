import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import {
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  ButtonBase
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faDownload, faEnvelope } from '@fortawesome/free-solid-svg-icons'

import SideMenu from 'components/SideMenu'
import Section from 'components/Section'
import Exp1 from 'mdx/Exp1.mdx'
import Exp2 from 'mdx/Exp2.mdx'
import Skills from 'mdx/Skills.mdx'
import projects from 'contents/projects'

const DRAWER_WIDTH = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  sectionPaper: {
    textAlign: 'left',
    padding: theme.spacing(5),
    whiteSpace: 'pre-line'
  },
  card: {
    textAlign: 'left',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flex: 1
  },
  link: {
    // Remove all styling of 'a' tag
    color: 'inherit',
    textDecoration: 'inherit'
  },
  fullWidth: {
    width: '100%'
  },
  contactIcon: {
    color: 'white',
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(1)
    }
  }
}))

export default function HomePage({ texts, announcement }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <SideMenu drawerWidth={DRAWER_WIDTH} />

      <Box className={classes.main}>
        <Box
          sx={{
            backgroundImage: 'url("/assets/images/front-desktop.jpg")',
            '@media (max-width: 1000px)': {
              backgroundImage: 'url("/assets/images/front-medium.jpg")'
            },
            '@media (max-width: 768px)': {
              backgroundImage: 'url("/assets/images/front-mobile.jpg")'
            },

            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Typography variant="h2" sx={{ color: 'white', padding: 2 }}>
            {'Strive to be better everyday.'}
          </Typography>
        </Box>

        {/* <div className={classes.heroImage}>
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
        </div> */}

        <Section id="experience" title="EXPERIENCE">
          <Box sx={{ textAlign: 'left' }}>
            <Paper elevation={8} className={clsx(classes.sectionPaper, classes.fullWidth)}>
              <Exp1 />
            </Paper>
            <Box marginBottom={8} />
            <Paper elevation={8} className={clsx(classes.sectionPaper, classes.fullWidth)}>
              <Exp2 />
            </Paper>
          </Box>
        </Section>

        <Section id="projects" title="PROJECTS">
          <Grid container spacing={4}>
            {projects.map((project, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <a
                    href={project.gitSrc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.link}
                  >
                    <CardMedia
                      className={classes.cardMedia}
                      image={project.imageSrc}
                      title={project.heading}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5">
                        {project.heading}
                      </Typography>
                      <Typography variant="body1">{project.content}</Typography>
                    </CardContent>
                  </a>
                  <CardActions>
                    <Button
                      variant="outlined"
                      size="medium"
                      color="primary"
                      href={project.gitSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {'View on GitHub'}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Section>

        <Section id="skills" title="SKILLS">
          <Paper elevation={4} className={classes.sectionPaper}>
            <Skills />
          </Paper>
        </Section>

        <Section id="education" title="EDUCATION">
          <Paper elevation={4} className={clsx(classes.sectionPaper, classes.fullWidth)}>
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
          <Paper elevation={4} sx={{ padding: 5 }}>
            <Box sx={{ marginBottom: 3 }} />
            <Box>
              <Button
                variant="contained"
                color="primary"
                sx={{ fontSize: '1.125rem' }}
                endIcon={<FontAwesomeIcon icon={faDownload} />}
                href="HyeonHong-English.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                {'Resume - English'}
              </Button>
            </Box>
            <Box sx={{ marginBottom: 6 }} />
            <Box>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#6e5494', color: '#fff', fontSize: '1.125rem' }}
                endIcon={<FontAwesomeIcon icon={faDownload} />}
                href="HyeonHong-Korean.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                {'Resume - Korean'}
              </Button>
            </Box>
            <Box sx={{ marginBottom: 3 }} />
          </Paper>
        </Section>

        <Section id="contact" title="CONTACT" fullHeight>
          <Paper
            elevation={8}
            sx={{ padding: 8, textAlign: 'left', '& > * + *': { marginTop: 6 } }}
          >
            <Box>
              <IconButton className={classes.contactIcon}>
                <FontAwesomeIcon icon={faEnvelope} />
              </IconButton>
              <Typography
                variant="h6"
                component={ButtonBase}
                href="mailto:hyeonshong@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                {'hyeonshong@gmail.com'}
              </Typography>
            </Box>
            <Box>
              <IconButton className={classes.contactIcon}>
                <FontAwesomeIcon icon={faGithub} />
              </IconButton>
              <Typography
                variant="h6"
                component={ButtonBase}
                href="https://github.com/hyeonhong"
                target="_blank"
                rel="noopener noreferrer"
              >
                {'github.com/hyeonhong'}
              </Typography>
            </Box>
            <Box>
              <IconButton className={classes.contactIcon}>
                <FontAwesomeIcon icon={faLinkedin} />
              </IconButton>
              <Typography
                variant="h6"
                component={ButtonBase}
                href="https://linkedin.com/in/hyeonhong"
                target="_blank"
                rel="noopener noreferrer"
              >
                {'linkedin.com/in/hyeonhong'}
              </Typography>
            </Box>
          </Paper>
        </Section>
      </Box>
    </div>
  )
}

// export async function getStaticProps({ params }) {
//   const announcement = await fetchStrapiAPI('/announcement')

//   return {
//     props: { announcement },
//     revalidate: 1
//   }
// }
