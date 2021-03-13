// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

// import Header from './Header'
import Footer from './Footer'
// import Spinner from './Spinner'
// import ContactPopUp from './ContactPopUp'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  }
}))

const Layout = ({ children }) => {
  const classes = useStyles()
  // const router = useRouter()

  return (
    <div className={classes.root}>
      {/* <Header /> */}
      {/* <ContactPopUp /> */}
      {children}
      <Box sx={{ flex: 1 }} />
      <Footer />
    </div>
  )
}

export default Layout
