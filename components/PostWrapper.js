import { useState } from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import { useMediaQuery, Tabs, Tab, Typography, Paper, Box, Button } from '@material-ui/core'
import clsx from 'clsx'

import Date from 'components/Date'
const { postsPerPage } = require('config')

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    width: '100%',
    '@media (max-width: 599px)': {
      flexDirection: 'column'
    }
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    minWidth: 200
  },
  tab: {
    textTransform: 'none',

    [theme.breakpoints.up('sm')]: {
      // paddingLeft: theme.spacing(8),
      '& span': {
        alignItems: 'flex-start' // left align
      }
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: 50
    }
  },
  activeTab: {
    backgroundColor: '#f1f1f1'
  }
}))

export default function PostWrapper({ tabLabels, allCategory }) {
  const classes = useStyles()
  const [tabValue, setTabValue] = useState(0)
  const [visiblePosts, setVisiblePosts] = useState(postsPerPage)

  const isMobile = useMediaQuery('(max-width:600px)')

  const SingleCard = ({ post }) => (
    <Box sx={{ marginBottom: 4 }}>
      <Link href={`/post/${post.slug}`}>
        <a style={{ textDecoration: 'none' }}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">{post.title}</Typography>
            <Box sx={{ marginBottom: 2 }} />
            <Typography variant="body2" color="textSecondary">
              <Date dateString={post.published_at} />
            </Typography>
          </Paper>
        </a>
      </Link>
    </Box>
  )

  const components = allCategory.map((posts) =>
    posts.slice(0, visiblePosts).map((post) => <SingleCard key={post.id} post={post} />)
  )

  const postsCount = allCategory.map((posts) => posts.length)
  const tabTexts = ['전체보기', ...tabLabels]

  return (
    <div className={classes.main}>
      <Tabs
        orientation={isMobile ? 'horizontal' : 'vertical'}
        variant="fullWidth"
        value={tabValue}
        onChange={(event, newValue) => {
          setTabValue(newValue)
          setVisiblePosts(postsPerPage)
        }}
        className={clsx(!isMobile && classes.tabs)}
        indicatorColor="secondary"
        textColor="secondary"
        // TabIndicatorProps={{
        //   style: {
        //     backgroundColor: '#19857b'
        //   }
        // }}
      >
        {components.map((_, index) => (
          <Tab
            key={index}
            label={<Typography variant="body1">{tabTexts[index]}</Typography>}
            className={clsx(classes.tab, tabValue === index && classes.activeTab)}
          />
        ))}
      </Tabs>

      {isMobile && <Box sx={{ marginBottom: 6 }} />}

      <Box sx={{ width: '100%', ...(!isMobile && { marginLeft: 10 }) }}>
        {components.map((component, index) => (
          <Box key={index} sx={{ ...(tabValue !== index && { display: 'none' }) }}>
            {component}
          </Box>
        ))}
        <Box
          sx={{
            textAlign: 'center',
            ...(postsCount[tabValue] <= visiblePosts && { display: 'none' })
          }}
        >
          <Button
            variant="contained"
            onClick={() => setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + postsPerPage)}
          >
            {'loadMore'}
          </Button>
        </Box>
      </Box>
    </div>
  )
}
