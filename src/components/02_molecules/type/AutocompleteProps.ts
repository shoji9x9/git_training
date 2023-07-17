import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  SxProps,
} from "@mui/material";

export type OptionType = {
  key: string;
  value: string;
};

export type AutocompleteProps = {
  value: OptionType | null;
  onChange: (
    event: React.SyntheticEvent,
    value: OptionType | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<OptionType>
  ) => void;
  onInputChange?: (
    event: React.SyntheticEvent<Element, Event>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => void;
  options: OptionType[];
  disabled?: boolean;
  fullWidth?: boolean;
  key?: string;
  sx?: SxProps;

  // 以下はTextFieldのプロパティ
  label: string;
  shrink?: boolean;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  error?: boolean;
  helperText?: string;
};

export type AutocompleteMultiProps = Omit<
  AutocompleteProps,
  "value" | "onChange"
> & {
  value: OptionType[];
  onChange: (
    event: React.SyntheticEvent,
    // value: OptionType | Array<OptionType> | null,
    value: OptionType[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<OptionType>
  ) => void;
};
