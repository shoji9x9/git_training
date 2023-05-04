import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  SxProps,
} from "@mui/material";
import { InputFieldProps } from "./InputFieldProps";
import { SyntheticEvent } from "react";

type AutocompleteInputFieldProps = Omit<
  InputFieldProps,
  "value" | "onChange" | "disabled" | "fullWidth" | "key" | "sx"
>;

export type OptionType = {
  key: string;
  value: string;
};

export type AutocompleteProps = {
  autocompleteInputFieldProps: AutocompleteInputFieldProps;
  // label: string;
  // shrink?: boolean;
  // value: string | number;
  // placeholder?: string;
  // required?: boolean;
  // autoComplete?: string;
  // error?: boolean;
  // helperText?: string;
  // disabled?: boolean;
  // fullWidth?: boolean;
  // onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // key?: string;
  // sx?: SxProps;
  value: OptionType | null;
  onChange: (
    event: React.SyntheticEvent,
    // value: OptionType | Array<OptionType> | null,
    value: OptionType | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<OptionType>
  ) => void;
  inputValue?: string;
  onInputChange?: (
    event: React.SyntheticEvent<Element, Event>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => void;
  options: OptionType[];
  disabled?: boolean;
  fullWidth?: boolean; // うまく効かない
  key?: string;
  sx?: SxProps;
};
