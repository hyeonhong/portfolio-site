import { makeStyles } from '@material-ui/core/styles'
import { Typography, Container, Box } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#242626',
    color: '#f8f9fa'
  },
  link: {
    // Remove all styling of 'a' tag
    color: 'inherit',
    textDecoration: 'inherit'
  }
}))

export default function Footer({ texts }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Container>
        <Box sx={{ marginBottom: 2 }} />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body1" display="inline">
            {'Built with Next.js & Material-UI:'}
          </Typography>
          <Typography variant="body1" display="inline" sx={{ whiteSpace: 'pre' }}>
            {'  '}
          </Typography>
          <a
            href={'https://github.com/hyeonhong/portfolio-site'}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}
          >
            <Typography variant="body1" display="inline" href="" sx={{ color: '#1976d2' }}>
              {'View on Github'}
            </Typography>
          </a>
          <Box sx={{ marginBottom: 2 }} />
          <Typography variant="body1">{`© ${new Date().getFullYear()} Hyeon Hong`}</Typography>
        </Box>
        <Box sx={{ marginBottom: 2 }} />
      </Container>
    </div>
  )
}
