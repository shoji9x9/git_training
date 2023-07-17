import { TextField } from "@mui/material";
import { NumberFieldProps } from "./type/InputFieldProps";

// WARNING: マイナスを手入力できない課題あり
// https://stackoverflow.com/questions/70693607/how-to-modifiy-material-ui-textfield-input-type-number
// https://qiita.com/faunsu/items/bb764a5170b0ce2401a0
export function NumberField(props: NumberFieldProps): JSX.Element {
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
  const type = "number";
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
