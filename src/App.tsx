import React from "react";
import "./App.css";
import { theme } from "./styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import { TextField } from "./components/01_atoms/TextField";
import { DateField } from "./components/01_atoms/DateField";
import { AutocompleteSingle } from "./components/02_molecules/AutocompleteSingle";
// import { ContainedButton } from "./components/01_atoms/ContainedButton";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TextField label="Text" value=""></TextField>
      <DateField label="Date" value=""></DateField>
      {/* <AutocompleteSingle /> */}
    </ThemeProvider>
  );
}

export default App;
