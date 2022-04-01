import React from "react";
import { useField, FieldHookConfig } from "formik";
import TextField from "@mui/material/TextField";

type CustomTextFieldProps = {
  type: string;
  label: string;
  autoFocus?: boolean;
} & FieldHookConfig<{}>;

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  type,
  label,
  autoFocus,
  ...props
}) => {
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

export default CustomTextField;
