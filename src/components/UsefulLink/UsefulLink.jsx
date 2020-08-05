import React from 'react';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

const UsefulLink = ({ textLink, className = '' }) => (
  <Grid item xs className={className}>
    <Link href="#" variant="body2">
      <span>{textLink}</span>
    </Link>
  </Grid>
);

export default UsefulLink;
