import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

function SEO({ description, lang, meta, title, articleInfo }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          buildTime(formatString: "YYYY-MM-DD")
          siteMetadata {
            title
            description
            author
            url
            image
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  // schema.org in JSONLD format
  // https://developers.google.com/search/docs/guides/intro-structured-data

  const schemaWebPage = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    url: site.siteMetadata.url,
    headline: site.siteMetadata.description,
    inLanguage: lang,
    mainEntityOfPage: site.siteMetadata.url,
    description: site.siteMetadata.description,
    name: site.siteMetadata.title,
    author: {
      '@type': 'Person',
      name: site.siteMetadata.author
    },
    copyrightHolder: {
      '@type': 'Person',
      name: site.siteMetadata.author
    },
    copyrightYear: `${new Date().getFullYear()}`,
    creator: {
      '@type': 'Person',
      name: site.siteMetadata.author
    },
    publisher: {
      '@type': 'Person',
      name: site.siteMetadata.author
    },
    datePublished: '2019-12-09T10:30:00+09:00',
    dateModified: site.buildTime,
    image: {
      '@type': 'ImageObject',
      url: `${site.siteMetadata.url}${site.siteMetadata.image}`
    }
  };

  let schemaArticle = null;

  if (articleInfo) {
    schemaArticle = {
      ...schemaWebPage,
      '@type': 'Article',
      headline: title || site.siteMetadata.title,
      description: description || site.siteMetadata.description,
      name: title || site.siteMetadata.title,
      datePublished: articleInfo.firstPublicationDate,
      dateModified: articleInfo.lastPublicationDate,
      url: `${site.siteMetadata.url}${articleInfo.pathname}`,
      mainEntityOfPage: `${site.siteMetadata.url}${articleInfo.pathname}`
      // image: {
      //   '@type': 'ImageObject',
      //   url: `${site.siteMetadata.url}${articleInfo.imagePathname}`
      // }
    };
  }

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription
        },
        {
          property: `og:title`,
          content: title
        },
        {
          property: `og:description`,
          content: metaDescription
        },
        {
          property: `og:type`,
          content: `website`
        },
        {
          name: `twitter:card`,
          content: `summary`
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author
        },
        {
          name: `twitter:title`,
          content: title
        },
        {
          name: `twitter:description`,
          content: metaDescription
        }
      ].concat(meta)}
    >
      {/* Insert schema.org data conditionally (webpage vs article) */}
      {!articleInfo && <script type="application/ld+json">{JSON.stringify(schemaWebPage)}</script>}
      {articleInfo && <script type="application/ld+json">{JSON.stringify(schemaArticle)}</script>}
    </Helmet>
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired
};

export default SEO;
