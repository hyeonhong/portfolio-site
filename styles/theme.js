import { createTheme, responsiveFontSizes } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#fff'
    }
  },
  typography: {
    // fontFamily: ['Noto Sans KR', 'sans-serif'].join(','),
    button: {
      textTransform: 'none'
    }
  }
})

export default responsiveFontSizes(theme)
