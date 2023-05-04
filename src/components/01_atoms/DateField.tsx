import { TextField } from "@mui/material";
import { InputFieldProps } from "./type/InputFieldProps";

export function DateField(props: InputFieldProps) {
  const {
    label,
    shrink = true,
    value,
    placeholder,
    required,
    autoComplete,
    error,
    helperText,
    disabled,
    fullWidth,
    onChange,
    key,
    sx,
  } = props;
  const type = "date";
  const variant = "outlined";
  const size = "small";
  const margin = "dense";
  const inputLabelProps = { shrink: shrink };

  return (
    <TextField
      type={type}
      variant={variant}
      size={size}
      margin={margin}
      label={label}
      InputLabelProps={inputLabelProps}
      value={value}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      error={error}
      helperText={helperText}
      disabled={disabled}
      fullWidth={fullWidth}
      onChange={onChange}
      key={key}
      sx={sx}
    ></TextField>
  );
}
