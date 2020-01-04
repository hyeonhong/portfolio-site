require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    title: 'Hyeon Hong',
    description: 'Software Developer Portfolio',
    author: 'Hyeon Hong'
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/blog`
      }
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-relative-images',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 500,
              linkImagesToOriginal: false
            }
          },
          {
            resolve: 'gatsby-remark-vscode',
            options: {
              colorTheme: {
                defaultTheme: 'Solarized Light', // Required
                prefersDarkTheme: 'Dark+ (default dark)'
              }
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png' // This path is relative to the root of the site.
      }
    },
    {
      resolve: 'gatsby-plugin-prefetch-google-fonts',
      options: {
        fonts: [
          {
            family: 'Roboto',
            variants: ['300', '400', '500', '700']
          },
          {
            family: 'Montserrat',
            variants: ['300', '400', '500', '600']
          },
          {
            family: 'Lato',
            variants: ['300', '400', '700']
          },
          {
            family: 'Lora',
            variants: ['400', '700']
          }
          // {
          //   family: 'Open Sans',
          //   variants: ['300', '400', '600', '700']
          // }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-153659862-1'
      }
    },
    'gatsby-plugin-material-ui'
    // 'gatsby-plugin-offline' // Must be placed at the end
  ]
};
