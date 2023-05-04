/** @jsxImportSource @emotion/react */
import {
  Autocomplete,
  FilterOptionsState,
  TextField as MUITextField,
} from "@mui/material";
import { AutocompleteProps, OptionType } from "./type/AutocompleteProps";
import { useState } from "react";
import { TextField } from "./TextField";
import { css } from "@emotion/react";

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
];

/*
export function AutocompleteSingle() {
  const type = "text";
  const variant = "outlined";
  const size = "small";
  const margin = "dense";
  const inputLabelProps = { shrink: true };
  const label = "Movie";
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      sx={{ width: 300 }}
      renderInput={(params) => {
        console.log("params");
        console.log(params);

        // const ret = (
        //   <MUITextField
        //     {...params}
        //     type={type}
        //     variant={variant}
        //     size={size}
        //     margin={margin}
        //     label={label}
        //     InputLabelProps={inputLabelProps}
        //   />
        // );

        const ret = <TextField {...params} label={label} />;
        console.log(ret);
        return ret;
      }}
    />
  );
}
*/

export function AutocompleteSingle(props: AutocompleteProps) {
  const {
    autocompleteInputFieldProps,
    value,
    onChange,
    // inputValue,
    onInputChange,
    options,
    disabled,
    fullWidth,
    key,
    sx,
  } = props;

  const [inputValue, setInputValue] = useState("");

  console.log(props);

  return (
    <Autocomplete
      //   value={value}
      //   onChange={onChange}
      //   onInputChange={
      //     onInputChange
      //       ? (event, newInputValue, reason) => {
      //           setInputValue(newInputValue);
      //           onInputChange(event, newInputValue, reason);
      //         }
      //       : undefined
      //   }
      options={options}
      renderInput={(params) => {
        console.log(params);
        return (
          <TextField {...params} label={autocompleteInputFieldProps.label} />
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
