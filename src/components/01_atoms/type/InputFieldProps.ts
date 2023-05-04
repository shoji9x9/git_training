import { SxProps } from "@mui/material";

export type InputFieldProps = {
  label: string;
  shrink?: boolean;
  value?: string | number;
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
