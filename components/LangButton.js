import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Image from 'next/image'
import { Button, Menu, MenuItem, Box } from '@material-ui/core'

import { useLang } from 'utils/hook/useLang'

const useStyles = makeStyles((theme) => ({
  langItem: {
    width: 200
  }
}))

export default function LangButton() {
  const classes = useStyles()
  const { lang, switchLang } = useLang()
  const [langAnchor, setLangAnchor] = useState(null)

  const koreaFlag = <Image src="/assets/kr.svg" alt="korea-flag" width={26.6} height={20} />
  const usFlag = <Image src="/assets/us.svg" alt="us-flag" width={26.6} height={20} />

  return (
    <>
      <Button
        disableElevation
        disableRipple
        disableFocusRipple
        disableTouchRipple
        onClick={(e) => setLangAnchor(e.currentTarget)}
      >
        {lang === 'kr' ? koreaFlag : usFlag}
        <Box sx={{ marginRight: 1 }} />
        <div
          style={{
            display: 'inline-block',
            content: '""', // NB: Use quotes twice
            verticalAlign: '.255rem',
            borderLeft: '.3rem solid transparent',
            borderRight: '.3rem solid transparent',
            borderTop: '.3rem solid rgba(0, 0, 0, 0.87)'
          }}
        />
      </Button>
      <Menu
        id="lang-dropdown-menu"
        anchorEl={langAnchor}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        keepMounted
        open={Boolean(langAnchor)}
        onClose={() => setLangAnchor(null)}
        TransitionProps={{
          timeout: 0 // Disable transition
        }}
      >
        <MenuItem
          onClick={() => {
            lang !== 'kr' && switchLang('kr')
            setLangAnchor(null)
          }}
          className={classes.langItem}
        >
          {koreaFlag}
          <Box sx={{ marginRight: 2 }} />
          {'한국어'}
        </MenuItem>
        <MenuItem
          onClick={() => {
            lang !== 'en' && switchLang('en')
            setLangAnchor(null)
          }}
          className={classes.langItem}
        >
          {usFlag}
          <Box sx={{ marginRight: 2 }} />
          {'English'}
        </MenuItem>
      </Menu>
    </>
  )
}
