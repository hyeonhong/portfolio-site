// code reference:
// https://github.com/mui-org/material-ui/blob/master/docs/src/modules/components/AppTableOfContents.js

import React from 'react'
import throttle from 'lodash/throttle'
import { makeStyles } from '@material-ui/core/styles'
import { ListItemIcon, ListItemText, MenuList, MenuItem } from '@material-ui/core'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {
  faBriefcase,
  faWindowRestore,
  faCog,
  faUniversity,
  faFile,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons'

const useStyles = makeStyles((theme) => ({
  selected: {
    backgroundColor: '#f1f1f1 !important'
    // color: 'white',
    // fontWeight: 600
  }
}))

const noop = () => {}

function useThrottledOnScroll(callback, delay) {
  const throttledCallback = React.useMemo(() => (callback ? throttle(callback, delay) : noop), [
    callback,
    delay
  ])

  React.useEffect(() => {
    if (throttledCallback === noop) {
      return undefined
    }

    window.addEventListener('scroll', throttledCallback)
    return () => {
      window.removeEventListener('scroll', throttledCallback)
      throttledCallback.cancel()
    }
  }, [throttledCallback])
}

const lists = [
  {
    label: 'Experience',
    linkId: 'experience',
    icon: <FontAwesomeIcon icon={faBriefcase} />
  },
  {
    label: 'Projects',
    linkId: 'projects',
    icon: <FontAwesomeIcon icon={faWindowRestore} />
  },
  {
    label: 'Skills',
    linkId: 'skills',
    icon: <FontAwesomeIcon icon={faCog} />
  },
  {
    label: 'Education',
    linkId: 'education',
    icon: <FontAwesomeIcon icon={faUniversity} />
  },
  {
    label: 'Resume',
    linkId: 'resume',
    icon: <FontAwesomeIcon icon={faFile} />
  },
  {
    label: 'Contact',
    linkId: 'contact',
    icon: <FontAwesomeIcon icon={faEnvelope} />
  }
]

function DrawerList() {
  const [activeState, setActiveState] = React.useState('')

  const ids = lists.map((list) => list.linkId)
  const itemsServer = React.useMemo(() => {
    return ids.map((id) => {
      return {
        hash: id,
        node: document.getElementById(id)
      }
    })
  }, [ids])

  const itemsClientRef = React.useRef([])
  React.useEffect(() => {
    itemsClientRef.current = itemsServer
  }, [itemsServer])

  const clickedRef = React.useRef(false)
  const unsetClickedRef = React.useRef(null)
  const findActiveIndex = React.useCallback(() => {
    // // set default if activeState is null
    // if (activeState === null) {
    //   setActiveState(itemsServer[0].hash);
    // }

    // Don't set the active index based on scroll if a link was just clicked
    if (clickedRef.current) {
      return
    }

    let active
    for (let i = itemsClientRef.current.length - 1; i >= 0; --i) {
      // No hash if we're near the top of the page
      if (document.documentElement.scrollTop < 600) {
        active = { hash: null }
        break
      }

      const item = itemsClientRef.current[i]

      if (
        item.node &&
        item.node.offsetTop <
          document.documentElement.scrollTop + document.documentElement.clientHeight / 4
      ) {
        active = item
        break
      }
    }

    if (active && activeState !== active.hash) {
      setActiveState(active.hash)
    }
  }, [activeState])

  // Corresponds to 10 frames at 60 Hz
  useThrottledOnScroll(itemsServer.length > 0 ? findActiveIndex : null, 166)

  const handleClick = (hash) => (event) => {
    // Ignore click for new tab/new window behavior
    if (
      event.defaultPrevented ||
      event.button !== 0 || // ignore everything but left-click
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.shiftKey
    ) {
      return
    }

    // Used to disable findActiveIndex if the page scrolls due to a click
    clickedRef.current = true
    unsetClickedRef.current = setTimeout(() => {
      clickedRef.current = false
    }, 1000)

    if (activeState !== hash) {
      setActiveState(hash)

      document.getElementById(hash).scrollIntoView({
        behavior: 'smooth'
      })

      // Remove id tag from url
      window.history.replaceState(
        null,
        document.title,
        window.location.pathname + window.location.search
      )
    }
  }

  React.useEffect(
    () => () => {
      clearTimeout(unsetClickedRef.current)
    },
    []
  )

  const classes = useStyles()

  return (
    <MenuList>
      {lists.map((list) => (
        <MenuItem
          key={list.label}
          button
          onClick={handleClick(list.linkId)}
          selected={activeState === list.linkId}
          classes={{ selected: classes.selected }}
        >
          <ListItemIcon>{list.icon}</ListItemIcon>
          <ListItemText primary={list.label} />
        </MenuItem>
      ))}
    </MenuList>
  )
}

export default DrawerList
