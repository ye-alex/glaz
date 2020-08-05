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

import Copyright from './components/Copyright/';
import UsefulLink from './components/UsefulLink/';
import LocalizationBox from './components/LocalizationBox/';
import useStyles from './styles';
import { EMAIL, PASSWORD } from './constants';

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
    const localizationURL = 'https://dev1.glaz.systems/api/v1.2/localization/all';

    axios.get(localizationURL)
      .then(({ data }) => setLocalization(data))
      .catch(console.error);
  };

  const changeLocalization = async (value, event) => {
    event && event.preventDefault();

    const localizationURL = `https://dev1.glaz.systems/api/v1.2/localization/${value}`;

    const localization = await axios.get(localizationURL);

    const loginData = localization.data.login;

    return setLoginData(loginData);
  }

  const onChange = (name, event) => {
    const { value } = event.target;

    // eslint-disable-next-line
    switch (name) {
      case EMAIL:
        setUserEmail(value);
        setErrors({
          ...errors,
          email: [],
        });
        break;
      case PASSWORD:
        setUserPassword(value);
        setErrors({
          ...errors,
          password: [],
        });
        break;
    }
  };

  const onSubmit = event => {
    event.preventDefault();

    setErrors({ ...initialErrors });

    const loginURL = 'https://dev1.glaz.systems/api/v1.2/authenticate/login';

    axios.post(loginURL, {
      email: userEmail,
      password: userPassword,
    })
      .then(({ data }) => setSignInData(data.message))
      .catch(({ response }) => {
        const { email = [], password = [] } = response.data;

        setErrors({
          ...errors,
          email,
          password,
        });
      });
  };

  const {
    sign_in_bt: signInBtn,
    remember_me: rememberMe,
    password,
    lost_password: lostPassword,
    email,
    dont_have_account: dontHaveAccount,
  } = loginData;

  const {
    paper,
    avatar,
    form,
    success,
    submit,
    locale,
    link,
  } = classes;

  const isEmail = !!errors.email.length;
  const isPassword = !!errors.password.length;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={paper}>
        <Avatar className={avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          {signInBtn}
        </Typography>

        <form className={form} noValidate onSubmit={onSubmit}>

          {signInData &&
            <p className={success}>{signInData}</p>
          }

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id={EMAIL}
            label={email}
            name={EMAIL}
            autoComplete={EMAIL}
            autoFocus
            onChange={event => onChange(EMAIL, event)}
            error={isEmail}
            helperText={isEmail ? errors.email : ''}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name={PASSWORD}
            label={password}
            type={PASSWORD}
            id={PASSWORD}
            autoComplete="current-password"
            onChange={event => onChange(PASSWORD, event)}
            error={isPassword}
            helperText={isPassword ? errors.password : ''}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label={rememberMe}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={submit}
          >
            {signInBtn}
          </Button>

          <Grid container>
            <UsefulLink textLink={lostPassword} />
            <UsefulLink textLink={dontHaveAccount} className={link} />
          </Grid>

        </form>
      </div>

      <LocalizationBox
        localization={localization}
        onClick={changeLocalization}
        classes={locale}
      />

      <Box mt={8}>
        <Copyright />
      </Box>

    </Container>
  );
}

export default SignIn;
