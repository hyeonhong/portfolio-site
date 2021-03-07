import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography, Container } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f7f7f7'
  },
  fullHeight: {
    minHeight: '100vh'
  },
  banner: {
    width: '100%',
    padding: theme.spacing(3),
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
  }
}))

const Section = ({ id, title, children, fullHeight }) => {
  const classes = useStyles()

  return (
    <section id={id} className={clsx(classes.root, fullHeight && classes.fullHeight)}>
      <Typography variant="h4" noWrap className={classes.banner}>
        {title}
      </Typography>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Box marginBottom={10} />
        {children}
        <Box marginBottom={10} />
      </Container>
    </section>
  )
}

export default Section
