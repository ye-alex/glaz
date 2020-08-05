import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Copyright from './components/Copyright/Copyright';
import UsefulLink from './components/UsefulLink/UsefulLink';
import LocalizationBox from './components/LocalizationBox/LocalizationBox';
import useStyles from './styles';

const SignIn = () => {
  const classes = useStyles();
  const initialErrors = { email: [], password: [] };

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [localization, setLocalization] = useState({});
  const [loginData, setLoginData] = useState({});
  const [signInData, setSignInData] = useState('');
  const [errors, setErrors] = useState(initialErrors);

  useEffect(() => {
    const locale = navigator.language.slice(0, 2);

    getAllLocalization();
    changeLocalization(locale);
  }, []);

  const getAllLocalization = () => {
    const url = 'https://dev1.glaz.systems/api/v1.2/localization/all';

    axios.get(url)
      .then(({ data }) => setLocalization(data))
      .catch(console.error);
  };

  const changeLocalization = async (value, event) => {
    event && event.preventDefault();

    const localizationURL = `https://dev1.glaz.systems/api/v1.2/localization/${value}`;

    const response = await axios.get(localizationURL);

    const result = response.data.login;

    return setLoginData(result);
  }

  const onChange = (name, event) => {
    const value = event.target ? event.target.value : event;

    switch (name) {
      case 'email':
        setUserEmail(value);
        setErrors({
          ...initialErrors,
          email: [],
        });
        break;
      case 'password':
        setUserPassword(value);
        setErrors({
          ...initialErrors,
          password: [],
        });
        break;
    }
  };

  const onSubmit = event => {
    event.preventDefault();

    setErrors(initialErrors);

    const loginURL = 'https://dev1.glaz.systems/api/v1.2/authenticate/login';

    axios.post(loginURL, {
      email: userEmail,
      password: userPassword,
    })
      .then(({ data }) => setSignInData(data.message))
      .catch(({ response }) => setErrors(response.data));
  };

  const {
    sign_in_bt,
    remember_me,
    password,
    lost_password,
    email,
    dont_have_account,
  } = loginData;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>

        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          {sign_in_bt}
        </Typography>

        <form className={classes.form} noValidate onSubmit={onSubmit}>

          {
            signInData && <p className={classes.success}>{signInData}</p>
          }

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label={email}
            name="email"
            autoComplete="email"
            autoFocus
            onChange={event => onChange('email', event)}
            error={!!errors.email.length}
            helperText={errors.email.length ? errors.email : ''}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={password}
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={event => onChange('password', event)}
            error={errors.password && errors.password.length ? true : false}
            helperText={errors.password && errors.password.length ? errors.password : ''}
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label={remember_me}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {sign_in_bt}
          </Button>

          <Grid container>
            <UsefulLink textLink={lost_password} />
            <UsefulLink textLink={dont_have_account} />
          </Grid>

        </form>
      </div>

      <LocalizationBox
        localization={localization}
        onClick={changeLocalization}
        classes={classes.locale}
      />

      <Box mt={8}>
        <Copyright />
      </Box>

    </Container>
  );
}

export default SignIn;
