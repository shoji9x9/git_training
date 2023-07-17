import { Button } from "@mui/material";
import { ButtonProps } from "./type/ButtonProps";

export function OutlinedButton(props: ButtonProps): JSX.Element {
  const { children, fullWidth, onClick, disabled, href, key, sx } = props;
  const variant = "outlined";
  const color = "primary";
  const size = "medium";

  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      onClick={onClick}
      disabled={disabled}
      href={href}
      key={key}
      sx={{ ...sx, marginTop: 1, marginBottom: 0.5 }}
    >
      {children}
    </Button>
  );
}
