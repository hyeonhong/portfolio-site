/* eslint-disable multiline-ternary */

import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  useMediaQuery,
  AppBar,
  Toolbar,
  Divider,
  Typography,
  Drawer,
  Box,
  ButtonBase,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'

import DrawerList from 'components/DrawerList'

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      // display: 'none'
    }
  },
  drawer: {
    width: (props) => props.drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: (props) => props.drawerWidth
  },
  link: {
    // Remove all styling of 'a' tag
    color: 'inherit',
    textDecoration: 'inherit'
  }
}))

const Menu = (props) => {
  const classes = useStyles(props)

  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const isMobile = useMediaQuery('(max-width:600px)')

  return isMobile ? (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {'Hyeon Hong'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        classes={{
          paper: classes.drawerPaper
        }}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        <DrawerList />
        <Divider />
        <Box marginBottom={4} />
        <ListItem
          component={'a'}
          className={classes.link}
          href={'https://hyeonhong.github.io/blog'}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ListItemIcon>
            <MenuIcon />
          </ListItemIcon>
          <ListItemText primary="Blog" />
        </ListItem>
      </Drawer>
    </>
  ) : (
    <Drawer
      variant="permanent"
      anchor="left"
      classes={{
        paper: classes.drawerPaper
      }}
      className={classes.drawer}
    >
      <Box marginBottom={5} />
      <ButtonBase
        // component="div"
        disableRipple
        onClick={() => document.body.scrollIntoView({ behavior: 'smooth' })}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <Typography variant="h5" align="center" color="primary" noWrap>
          {'Hyeon Hong'}
        </Typography>
        <Box marginBottom={1} />

        <Typography variant="body1" align="center" noWrap>
          {'Full Stack Developer'}
        </Typography>
      </ButtonBase>
      <Box marginBottom={5} />
      <Divider />
      <DrawerList />
      <Divider />
      <Box marginBottom={4} />
      <ListItem
        component={'a'}
        className={classes.link}
        href={'https://hyeonhong.github.io/blog'}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ListItemIcon>
          <MenuIcon />
        </ListItemIcon>
        <ListItemText primary="Blog" />
      </ListItem>
    </Drawer>
  )
}

export default Menu
