const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})
module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  images: {
    domains: ['drkang-media.s3.ap-northeast-2.amazonaws.com']
  }
})
