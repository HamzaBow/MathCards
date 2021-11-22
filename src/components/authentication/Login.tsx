import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link as UiLink } from "@mui/material/";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import makeStyles from '@mui/styles/makeStyles';
import Container from "@mui/material/Container";
import { Redirect, useHistory, Link } from "react-router-dom";

import { useAuth } from "contexts/AuthContext";
import { Formik, Form, useField, FieldHookConfig } from "formik";
import { Alert } from '@mui/material';
import { FcGoogle } from "react-icons/fc";

import Logo from  "../Logo";

import * as yup from "yup";
import { fetchCreateUser } from "api/userAPI";
import { LoadingButton } from "@mui/lab";

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

type CustomTextFieldProps = {
  type: string;
  label: string;
  autoFocus?: boolean;
 } & FieldHookConfig<{}>

const CustomTextField: React.FC<CustomTextFieldProps> = ({ type, label, autoFocus, ...props }) => {
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
  password: yup.string().required()
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

  const { login, currentUser, signInWithGoogleAuth } = useAuth();
  async function handleSubmit(data: any, { setSubmitting }: {setSubmitting: Function} ) {
    // e.preventDefault()
    try {
      setError("");
      setSubmitting(true);
      await login(data.email, data.password);
      history.push("/");
    } catch (err) {
      if(err instanceof Error) {
        setError((err as Error).message);
      } else {
        setError("Failed to sign in")
      }
    }
    setSubmitting(false);
  }

  async function handleContinueWithGoogle() {
    try {
      setError("");
      setLoading(true);
      const signInWithGoogleAuthResult = await signInWithGoogleAuth();
      await fetchCreateUser(signInWithGoogleAuthResult.user.uid)
      // TODO: what if `signIn..` succeeds and `fetchCreateUser` fails, FIX IT
      history.push("/");
    } catch (err) {
      if(err instanceof Error) {
        setError((err as Error).message);
      } else {
        setError("Failed to continue with Google")
      }
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
              {({
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <Form className={classes.form} noValidate>
                <Button
                  type="button"
                  disabled={ isSubmitting || loading }
                  variant="outlined"
                  onClick={handleContinueWithGoogle}
                  className={classes.continueWithGoogle}
                  startIcon={<FcGoogle size={30} />}
                  size="large"
                  sx={{ position: "relative", left: "50%", transform: "translateX(-50%)"}}
                >
                  Continue With Google
                </Button>
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
                    loading={ isSubmitting }
                    loadingPosition="end"
                    disabled={ loading }
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
