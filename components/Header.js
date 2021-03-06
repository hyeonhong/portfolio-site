/* eslint-disable multiline-ternary */

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import {
  // useMediaQuery,
  AppBar,
  Container,
  Toolbar,
  Button,
  Box,
  MenuList,
  MenuItem,
  Typography,
  IconButton,
  Hidden,
  Drawer
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

import LangButton from 'components/LangButton'

const useStyles = makeStyles((theme) => ({
  appBar: {
    // backgroundColor: (props) => `rgba(231,170,148,${props.opacity})`,
    backgroundColor: '#fff',
    boxShadow: 'none'
  },
  logo: {
    padding: 0
  },
  filler: {
    flexGrow: 1
  },
  menuList: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0
  },
  menuItem: {
    // display: 'flex',
    justifyContent: 'center',
    minWidth: 100,
    borderRadius: 8,
    color: 'black'
  },
  menuItemText: {
    paddingBottom: theme.spacing(0.5)
  },
  activeMenuItem: {
    borderBottom: `3px solid ${theme.palette.primary.main}`
  },
  paper: {
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper
  },
  avatarItem: {
    minWidth: 200
  },
  drawerMenuItem: {
    justifyContent: 'center'
  }
}))

export default function Header({ texts }) {
  const classes = useStyles()
  const router = useRouter()

  const [drawerOpen, setDrawerOpen] = useState(false)

  const paths = Object.keys(texts.tabLabels)

  // const isTablet = useMediaQuery('(max-width:768px)')

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Button onClick={() => router.push('/')} color="inherit" className={classes.logo}>
            <Image src="/assets/logo.png" alt="company logo" width={130} height={42.8} />
          </Button>
          <Box className={classes.filler} />
          <Hidden smDown>
            <MenuList className={classes.menuList}>
              {paths.map((path) => (
                <MenuItem
                  key={path}
                  button
                  onClick={() => router.push(path)}
                  className={classes.menuItem}
                >
                  <Typography
                    variant="body1"
                    className={clsx(
                      classes.menuItemText,
                      router.pathname === path && classes.activeMenuItem
                    )}
                  >
                    {texts.tabLabels[path]}
                  </Typography>
                </MenuItem>
              ))}
            </MenuList>
            <LangButton />
          </Hidden>
          <Hidden smUp>
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </Container>
      <Hidden smUp>
        <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <div onClick={() => setDrawerOpen(false)} className={classes.hamburgerMenu}>
            <Box sx={{ marginBottom: 10 }} />
            <MenuList>
              {paths.map((path) => (
                <MenuItem
                  key={path}
                  onClick={() => router.push(path)}
                  classes={{ root: classes.drawerMenuItem }}
                >
                  {texts.tabLabels[path]}
                </MenuItem>
              ))}
            </MenuList>
          </div>
        </Drawer>
      </Hidden>
    </AppBar>
  )
}
