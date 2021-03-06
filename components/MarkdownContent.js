/* eslint-disable react/display-name */

import { useMediaQuery, Typography } from '@material-ui/core'
import ReactMarkdown from 'react-markdown'

export default function MarkdownContent({ source }) {
  const isMobile = useMediaQuery('(max-width:600px)')

  const renderers = {
    ...(isMobile && {
      image: ({ src, alt, ...rest }) => (
        <img src={src} alt={alt} {...rest} style={{ maxWidth: '100%', maxHeight: '100%' }} />
      )
    }),
    paragraph: (props) => <Typography component={'div'} variant={'body1'} {...props} />,
    heading: ({ level, ...rest }) => <Typography variant={`h${level}`} {...rest} />
  }

  return <ReactMarkdown source={source} renderers={renderers} escapeHtml={false} />
}
