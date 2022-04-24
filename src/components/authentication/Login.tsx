import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Link as UiLink } from "@mui/material/";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import Container from "@mui/material/Container";
import { Redirect, useHistory, Link } from "react-router-dom";

import { useAuth } from "contexts/AuthContext";
import { Formik, Form} from "formik";
import { Alert } from "@mui/material";

import Logo from "../Logo";
import { Copyright } from "components/Footer";

import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import ContinueWithGoogleBtn from "./ContinueWithGoogleBtn";
import PadlockIcon from "./PadlockIcon";
import CustomTextField from "./CustomTextField";

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
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
  },
  alert: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
}));


const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Must Contain at Least 8 characters including uppercase, lowercase, numbers and special characters (!@#$% ...)"
    ),
});

export default function Login() {
  const classes = useStyles();

  const [error, setError] = useState("");
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const { login, currentUser } = useAuth();

  async function handleSubmit(
    data: any,
    { setSubmitting }: { setSubmitting: Function }
  ) {
    // e.preventDefault()
    try {
      setError("");
      setSubmitting(true);
      await login(data.email, data.password);
      history.push("/");
    } catch (err) {
      if (err instanceof Error) {
        setError((err as Error).message);
      } else {
        setError("Failed to sign in");
      }
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "1rem",
              }}
            >
              <PadlockIcon />
              <Typography
                component="h1"
                variant="h5"
                style={{ marginRight: "2rem" }}
              >
                Sign in
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
              {({ isSubmitting, handleChange, handleBlur, handleSubmit }) => (
                <Form className={classes.form} noValidate>
                  <ContinueWithGoogleBtn
                    isSubmitting={isSubmitting}
                    loading={loading}
                    setError={setError}
                    setLoading={setLoading}
                  />
                  <Typography
                    component="h2"
                    variant="h6"
                    sx={{ textAlign: "center" }}
                  >
                    OR
                  </Typography>
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
                  <LoadingButton
                    type="submit"
                    loading={isSubmitting}
                    loadingPosition="end"
                    disabled={loading}
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    size="large"
                  >
                    Sign in
                  </LoadingButton>
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
