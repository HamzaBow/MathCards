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

import { FcGoogle } from "react-icons/fc";

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
    margin: theme.spacing(3, 0, 1),
  },
  continueWithGoogle: {
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
  passwordConfirm: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default function Signup() {
  const classes = useStyles();

  const [error, setError] = useState("");
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const { signup, currentUser, signInWithGoogleAuth } = useAuth();
  async function handleSubmit(data, { setSubmitting }) {
    // e.preventDefault()
    try {
      setError("");
      setSubmitting(true);
      await signup(data.email, data.password);
      history.push("/");
    } catch (err) {
      setError("Failed to create an account");
      console.error(err);
    }
    setSubmitting(false);
  }

  async function handleContinueWithGoogle() {
    try {
      setError("");
      setLoading(true);
      await signInWithGoogleAuth();
      history.push("/");
    } catch (err) {
      setError("Failed to sign in with Google");
      console.error(err);
    }
    setLoading(false);
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "1rem",
              }}
            >
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                style={{ marginRight: "2rem" }}
              >
                Sign up
              </Typography>
            </div>
            {error && (
              <div className={classes.alert}>
                <Alert variant="filled" severity="error">
                  {error}
                </Alert>
              </div>
            )}

            <Button
              type="button"
              disabled={loading}
              variant="outlined"
              onClick={handleContinueWithGoogle}
              className={classes.continueWithGoogle}
              startIcon={<FcGoogle size={30} />}
              size="large"
            >
              Continue With Google
            </Button>
            <Typography
              component="h2"
              variant="h6"
              style={{ textAlign: "center", margin: "1.2rem 0 0.6rem" }}
            >
              OR
            </Typography>
            <Formik
              validateOnChange={true}
              initialValues={{ email: "", password: "", passwordConfirm: "" }}
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
                  <CustomTextField
                    name="passwordConfirm"
                    type="password"
                    label="Confirm Password"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    size="large"
                  >
                    Sign Up
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link to="/login">
                        <UiLink href="/login" variant="body2">
                          Already have an account? Log in.
                        </UiLink>
                      </Link>
                    </Grid>
                    {/* <Grid item>
                      <Link to="/signup">
                        <UiLink href="/signup" variant="body2">
                        </UiLink>
                      </Link>
                    </Grid> */}
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
