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
      <Typography variant="body1" color="textPrimary" sx={{ whiteSpace: 'pre-line' }}>
        <Box fontWeight="fontWeightBold" display="inline">
          {'Hyeon Hong'}
        </Box>
        <br />
        {`The Universe is a cruel, uncaring void. The key to being happy isn't to search for meaning.
        It's to just keep yourself busy with unimportant nonsense. And eventually, you'll be dead. — Bojack Horseman
        `}
      </Typography>
    </div>
  )
}
