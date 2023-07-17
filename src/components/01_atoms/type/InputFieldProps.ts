import { SxProps } from "@mui/material";

export type InputFieldProps = {
  label: string;
  shrink?: boolean;
  value?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  key?: string;
  sx?: SxProps;
};

export type NumberFieldProps = Omit<InputFieldProps, "value"> & {
  value?: number;
};
