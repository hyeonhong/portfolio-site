---
title: 'Adding pagination in Material-UI'
date: '2019-11-30T20:08:57.249Z'
---

If you tried to search for the pagination component in Material-UI, you would probably find that there is no viable option to choose from. The closest component you could find is <strong>TablePagination</strong> and it comes with additional 'row-per-page' field where you select the number of rows to display in a table. From a functional standpoint, you could probably get away with using this but it really doesn't look pretty to have an unnecessary field next to page numbers.

So what is the alternative? Initially, I was planning on writing the code by myself but then I found the library called [material-ui-flat-pagination](https://github.com/szmslab/material-ui-flat-pagination).

According to the documentation this library is built with Button component in Material-UI.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Pagination from 'material-ui-flat-pagination';

const theme = createMuiTheme();

const BlogPage = () => {
  const [offset, setOffset] = React.useState(0);

  const handleClick = (event, newOffset) => {
    const newPage = newOffset / pageContext.limit + 1;
    history.push(`/blog/${newPage}/`);
    setOffset(newOffset);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Pagination limit={10} offset={offset} total={100} onClick={handleClick} />
    </MuiThemeProvider>
  );
};

ReactDOM.render(<BlogPage />, document.getElementById('root'));
```

In the above example, I had to convert the offset value to the page number, but other than that it is pretty straightforward to use.

It's no-frills pagination component and I highly recommend this package!
