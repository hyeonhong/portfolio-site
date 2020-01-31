import React from 'react';
import { MDXProvider } from '@mdx-js/react';
// import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//   header: {
//     backgroundImage: 'url("images/organization-hero-img.jpg")',
//     backgroundPosition: 'center',
//     backgroundRepeat: 'no-repeat',
//     backgroundSize: 'cover',
//     height: '50vh'
//   }
// }));

const components = {
  h1: (props) => <Typography variant={'h1'} {...props} />,
  h2: (props) => <Typography variant={'h2'} {...props} />,
  h3: (props) => <Typography variant={'h3'} {...props} />,
  h4: (props) => <Typography variant={'h4'} {...props} />,
  h5: (props) => <Typography variant={'h5'} {...props} />,
  h6: (props) => <Typography variant={'h6'} {...props} />,
  p: (props) => <Typography variant={'body1'} {...props} />
};

const MdxLayout = ({ children }) => {
  // const classes = useStyles();

  return <MDXProvider components={components}>{children}</MDXProvider>;
};

export default MdxLayout;
