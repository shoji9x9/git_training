import { SxProps } from "@mui/material";

export type ButtonProps = {
  children: React.ReactNode;
  fullWidth?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  href?: string;
  key?: string;
  sx?: SxProps;
};
