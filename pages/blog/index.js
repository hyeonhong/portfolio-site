import { useState } from 'react'
import Link from 'next/link'
// import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography, Paper, Box, Button } from '@material-ui/core'

import { getAllPosts } from 'lib/blogAPI'
import Date from 'components/Date'

const { postsPerPage } = require('config')

// const useStyles = makeStyles((theme) => ({}))

export default function BlogList({ posts }) {
  // const classes = useStyles()
  const [visiblePosts, setVisiblePosts] = useState(postsPerPage)

  // sort posts by date in descending order
  posts.sort((a, b) => (a.published_at > b.published_at ? -1 : 1))

  const SingleCard = ({ post }) => (
    <Box sx={{ marginBottom: 4 }}>
      <Link href={`/blog/${post.slug}`}>
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

  return (
    <Container maxWidth="md">
      <Box marginBottom={8} />
      <Typography variant="h4" color="primary" sx={{ fontFamily: 'Lora' }}>
        — Recent posts
      </Typography>

      <Box sx={{ marginBottom: 8 }} />
      {posts.slice(0, visiblePosts).map((post, index) => (
        <SingleCard key={post.slug} post={post} />
      ))}

      <Box sx={{ textAlign: 'center', ...(posts.length <= visiblePosts && { display: 'none' }) }}>
        <Button
          variant="contained"
          onClick={() => setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + postsPerPage)}
        >
          {'Load More'}
        </Button>
      </Box>
      <Box sx={{ marginBottom: 8 }} />
    </Container>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts()
  return {
    props: { posts }
  }
}
