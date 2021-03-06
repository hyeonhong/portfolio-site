import { makeStyles } from '@material-ui/core/styles'
import { Typography, Box } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: '50%'
  }
}))

export default function Bio() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <img
        src="/assets/images/profile-photo.jpg"
        width={75}
        height={75}
        className={classes.avatar}
      />
      <Box marginRight={4} />
      <Typography variant="body1" color="textPrimary">
        Written by <strong>Hyeon Hong</strong>, who strives to achieve the best in all areas, and is
        always open and eager to learn new skills and push himself in new ways.
      </Typography>
    </div>
  )
}
