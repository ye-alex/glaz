import React from 'react';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

const UsefulLink = ({ textLink }) => (
  <Grid item xs>
    <Link href="#" variant="body2">
      {textLink}
    </Link>
  </Grid>
);

export default UsefulLink;
