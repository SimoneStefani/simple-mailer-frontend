import React, { useState, useEffect } from "react";
import { useNavigation } from "react-navi";

import MarkunreadMailbox from "@material-ui/icons/MarkunreadMailbox";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

import { setLocalStorageItem, getLocalStorageItem } from "../support/localStorageUtils";
import { login } from "../api";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paperWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: "100vh",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
}));

const Login: React.FC = () => {
  // hooks
  const navigation = useNavigation();
  const classes = useStyles();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = getLocalStorageItem("token");
    if (token) navigation.navigate("/");
  }, []); // eslint-disable-line

  // functions
  const handleLogin = (event: any): void => {
    event.preventDefault();
    login(credentials)
      .then((res: any) => {
        setLocalStorageItem("token", res.data.jwt);
        navigation.navigate("/");
      })
      .catch((err) => console.error(err));
  };

  // render
  return (
    <Container component="main" maxWidth="xs" className={classes.paperWrapper}>
      <Paper variant="outlined">
        <Box component="div" p={5} className={classes.paper}>
          <Avatar className={classes.avatar}>
            <MarkunreadMailbox />
          </Avatar>
          <Typography component="h2" variant="h5">
            SimpleMailer - Login
          </Typography>

          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              placeholder="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={credentials.email}
              onChange={(e): void => setCredentials({ ...credentials, email: e.target.value })}
            />
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              name="password"
              placeholder="Password"
              type="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={(e): void => setCredentials({ ...credentials, password: e.target.value })}
            />
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              className={classes.submit}
              onClick={handleLogin}
            >
              Sign In
            </Button>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
