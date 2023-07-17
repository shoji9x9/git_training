import { IconButton, SvgIconPropsSizeOverrides, Tooltip } from "@mui/material";
import { OverridableStringUnion } from "@mui/types";
import DeleteIcon from "@mui/icons-material/Delete";

type TrushBoxButtonProps = {
  title?: string;
  placement?:
    | "left"
    | "right"
    | "top"
    | "bottom"
    | "bottom-end"
    | "bottom-start"
    | "left-end"
    | "left-start"
    | "right-end"
    | "right-start"
    | "top-end"
    | "top-start";
  arrow?: boolean;
  fontSize?: OverridableStringUnion<
    "inherit" | "large" | "medium" | "small",
    SvgIconPropsSizeOverrides
  >;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export function TrushBoxButton(props: TrushBoxButtonProps): JSX.Element {
  const {
    title = "Delete",
    placement,
    arrow,
    fontSize = "medium",
    disabled,
    onClick,
  } = props;
  return (
    <Tooltip title={title} placement={placement} arrow={arrow}>
      <IconButton disabled={disabled} onClick={onClick}>
        <DeleteIcon fontSize={fontSize} />
      </IconButton>
    </Tooltip>
  );
}
