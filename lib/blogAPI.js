import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const blogDirectory = path.join(process.cwd(), 'mdx/_blog')

export function getFilenames() {
  const filenames = fs.readdirSync(blogDirectory)
  return filenames
}

export function getPostBySlug(slug) {
  const filePath = path.join(blogDirectory, `${slug}.mdx`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  const post = {
    ...data,
    content,
    slug
  }

  return post
}

export function getAllPosts() {
  const slugs = getAllSlugs()
  const posts = slugs.map((slug) => getPostBySlug(slug))

  return posts
}

export function getAllSlugs() {
  const filenames = getFilenames()
  const slugs = filenames.reduce((result, filename) => {
    const filenameArr = filename.split('.')
    if (filenameArr.pop() === 'mdx') {
      result.push(filenameArr.join(''))
    }
    return result
  }, [])

  return slugs
}
