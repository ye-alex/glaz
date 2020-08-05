import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  locale: {
    marginTop: theme.spacing(3),
    textAlign: 'center',
    '& a': {
      marginRight: theme.spacing(1),
    }
  },
  success: {
    background: '#91e891',
    color: '#fff',
  },
  link: {
    textAlign: 'end',
  },
}));

export default useStyles;
