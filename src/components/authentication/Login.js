import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link as UiLink } from "@material-ui/core/";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Redirect, useHistory, Link } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { Formik, Form, useField } from "formik";
import { Alert } from "@material-ui/lab";

import Logo from "../../logo/Logo";

import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "2px solid lightgray",
    borderRadius: "12px",
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main,
    backgroundColor: "white",
    color: "darkblue",
    border: "2.5px solid darkblue",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <UiLink color="inherit" href="https://www.mathcards.com/">
        MathCards
      </UiLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const CustomTextField = ({ type, label, autoFocus, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      {...field}
      type={type}
      label={label}
      autoFocus={autoFocus}
      variant="outlined"
      margin="normal"
      fullWidth
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain at Least 8 characters including uppercase, lowercase, numbers and special characters (!@#$% ...)"
    ),
});

export default function SignIn() {
  const classes = useStyles();

  const [error, setError] = useState("");
  const history = useHistory();

  const { login, currentUser } = useAuth();
  async function handleSubmit(data, { setSubmitting }) {
    // e.preventDefault()
    try {
      setError("");
      setSubmitting(true);
      await login(data.email, data.password);
      history.push("/");
    } catch (err) {
      setError("Failed to log in");
      console.error(err);
    }
    setSubmitting(false);
  }
  return (
    <>
      {currentUser ? (
        <Redirect to="/" />
      ) : (
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <div className={classes.paper}>
            <Logo />
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" style={{marginRight: '2rem'}}>
                Log in
              </Typography>
            </div>
            {error && (
              <div className={classes.alert}>
                <Alert variant="filled" severity="error">
                  {error}
                </Alert>
              </div>
            )}
            <Formik
              validateOnChange={true}
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <Form className={classes.form} noValidate>
                  <CustomTextField
                    name="email"
                    type="email"
                    label="Email Address"
                  />
                  <CustomTextField
                    name="password"
                    type="password"
                    label="Password"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Log In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link to="/forgot-password">
                        <UiLink href="/forgot-password" variant="body2">
                          Forgot password?
                        </UiLink>
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link to="/signup">
                        <UiLink href="/signup" variant="body2">
                          {"Don't have an account? Sign Up"}
                        </UiLink>
                      </Link>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          <Box mt={8}>
            <Copyright />
          </Box>
          </div>
        </Container>
      )}
    </>
  );
}
