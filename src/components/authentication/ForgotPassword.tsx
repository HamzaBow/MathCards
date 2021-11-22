import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { LoadingButton } from "@mui/lab";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link as UiLink } from "@mui/material/";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import makeStyles from '@mui/styles/makeStyles';
import Container from "@mui/material/Container";
import { Redirect, Link } from "react-router-dom";

import { useAuth } from "contexts/AuthContext";
import { Formik, Form, useField, FieldHookConfig } from "formik";
import { Alert } from '@mui/material';

import Logo from "../Logo";

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
});

export default function ForgotPassword() {
  const classes = useStyles();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("")

  const { resetPassword, currentUser } = useAuth();
  async function handleSubmit(data: any, { setSubmitting }: {setSubmitting: Function} ) {
    // e.preventDefault()
    try {
      setError("");
      setMessage("");
      setSubmitting(true);
      await resetPassword(data.email);
      setMessage('Check your email for further instructions')
    } catch (err) {
      setError((err as Error).message);
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
                Password Reset
              </Typography>
            </div>
            {message && (
              <div className={classes.alert}>
                <Alert variant="filled" severity="success">
                  {message}
                </Alert>
              </div>
            )}
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
                  <LoadingButton
                    type="submit"
                    loading={isSubmitting}
                    loadingPosition="end"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Reset Password
                  </LoadingButton>
                  <Grid container>
                    <Grid item xs>
                      <Link to="/login">
                        <UiLink href="/login" variant="body2">
                          Login
                        </UiLink>
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link to="/signup">
                        <UiLink href="/signup" variant="body2">
                          {"Sign up"}
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
