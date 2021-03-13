import { makeStyles } from '@material-ui/core/styles'
import { Typography, Container, Box } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#242626',
    color: '#f8f9fa'
  }
}))

export default function Footer({ texts }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Container>
        <Box sx={{ marginBottom: 2 }} />
        <Typography
          variant="body1"
          align="center"
        >{`© ${new Date().getFullYear()} Hyeon Hong`}</Typography>
        <Box sx={{ marginBottom: 2 }} />
      </Container>
    </div>
  )
}
