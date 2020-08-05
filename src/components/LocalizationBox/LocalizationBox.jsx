import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const LocalizationBox = ({ localization, onClick, classes }) => (
  <Typography className={classes}>
    {Object.keys(localization).map((elem, i) =>
      <Link
        href="#"
        onClick={event => onClick(elem, event)}
        key={i}
      >
        {localization[elem].locale_name}
      </Link>
    )
    }
  </Typography>
);

export default LocalizationBox;
