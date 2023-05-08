/** @jsxImportSource @emotion/react */
import { Autocomplete } from "@mui/material";
import { AutocompleteMultiProps, OptionType } from "./type/AutocompleteProps";
import { TextField } from "../01_atoms/TextField";
import { css } from "@emotion/react";

export function AutocompleteMulti(props: AutocompleteMultiProps): JSX.Element {
  const {
    value,
    onChange,
    onInputChange,
    options,
    disabled,
    fullWidth,
    key,
    sx,
    label,
    shrink,
    placeholder,
    required,
    autoComplete,
    error,
    helperText,
  } = props;

  return (
    <Autocomplete
      multiple={true}
      value={value}
      onChange={onChange}
      onInputChange={
        onInputChange
          ? (event, newInputValue, reason) => {
              onInputChange(event, newInputValue, reason);
            }
          : undefined
      }
      options={options}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label={label}
            shrink={shrink}
            placeholder={placeholder}
            required={required}
            autoComplete={autoComplete}
            error={error}
            helperText={helperText}
          />
        );
      }}
      getOptionLabel={(option: OptionType) => option.value}
      //   filterOptions={(
      //     options: OptionType[],
      //     state: FilterOptionsState<OptionType>
      //   ) =>
      //     options.filter((option) =>
      //       option.value.toLowerCase().includes(state.inputValue.toLowerCase())
      //     )
      //   }
      disabled={disabled}
      key={key}
      sx={sx}
      css={css`
        & > div.MuiFormControl-root {
          width: ${fullWidth ? "100%;" : "auto;"};
        }
        & input.MuiInputBase-input {
          width: 100% !important;
        }
      `}
    ></Autocomplete>
  );
}
