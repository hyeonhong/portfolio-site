import { useRouter } from 'next/router'
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import {
  useMediaQuery,
  Container,
  Paper,
  Box,
  Typography,
  Button,
  Divider
} from '@material-ui/core'
import { NextSeo, BlogJsonLd } from 'next-seo'
import { DiscussionEmbed } from 'disqus-react'

import { getPostBySlug, getAllSlugs } from 'lib/blogAPI'
import Date from 'components/Date'
import Bio from 'components/Bio'

const components = {}

export default function BlogPost({ post }) {
  const router = useRouter()
  const mdxContent = hydrate(post.content, { components })

  const isMobile = useMediaQuery('(max-width:600px)')

  return (
    <Container>
      <NextSeo
        description={post.description}
        openGraph={{
          title: post.title,
          description: post.description,
          url: `https://hyeonhong.io/blog/${post.slug}`,
          type: 'article',
          article: {
            publishedTime: post.published_at,
            modifiedTime: post.updated_at,
            authors: ['Hyeon Hong']
            // tags: ['Tag A', 'Tag B', 'Tag C']
          }
        }}
      />
      <BlogJsonLd
        url={`https://hyeonhong.io/blog/${post.slug}`}
        title={post.title}
        datePublished={post.published_at}
        dateModified={post.updated_at}
        authorName="Hyeon Hong"
        description={post.description}
      />
      <Box sx={{ marginBottom: 8 }} />
      <Box sx={{ textAlign: 'center' }}>
        <Paper
          sx={{ padding: isMobile ? 4 : 8, display: 'inline-block', textAlign: 'left' }}
          elevation={3}
        >
          <Typography variant="h5">{post.title}</Typography>
          <Box sx={{ marginBottom: 4 }} />
          <Divider />
          <Box sx={{ marginBottom: 2 }} />
          <Typography variant="body2" color="textSecondary">
            <Date dateString={post.published_at} />
          </Typography>
          <Box sx={{ marginBottom: 4 }} />
          {mdxContent}

          <Box marginBottom={8} />
          <Divider />
          <Box marginBottom={4} />
          <Bio />
          <Box marginBottom={4} />
        </Paper>

        <Box sx={{ marginBottom: 12 }} />
        <Button
          variant="contained"
          disableElevation
          disableRipple
          disableFocusRipple
          disableTouchRipple
          onClick={() => router.push('/blog')}
        >
          {'Back To Blog'}
        </Button>
        <Box sx={{ marginBottom: 16 }} />

        <DiscussionEmbed
          shortname={process.env.NEXT_PUBLIC_DISQUS_NAME}
          config={{
            url: `https://hyeonhong.io/blog/${post.slug}`,
            identifier: post.slug,
            title: post.title
          }}
        />

        <Box sx={{ marginBottom: 16 }} />
      </Box>
    </Container>
  )
}

export async function getStaticPaths() {
  const slugs = getAllSlugs()

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug)
  const content = await renderToString(post.content, { components })

  return {
    props: {
      post: {
        ...post,
        content
      }
    }
  }
}
