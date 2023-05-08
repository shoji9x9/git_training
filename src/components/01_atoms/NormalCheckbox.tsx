import { Checkbox } from "@mui/material/";

type CheckboxProps = {
  size?: "small" | "medium";
  checked?: boolean;
  indeterminate?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  disabled?: boolean;
};

export function NormalCheckbox(props: CheckboxProps): JSX.Element {
  const { size, checked, indeterminate, onClick, onChange, disabled } = props;
  return (
    <Checkbox
      size={size}
      checked={checked}
      indeterminate={indeterminate}
      onClick={onClick}
      onChange={onChange}
      disabled={disabled}
    />
  );
}
