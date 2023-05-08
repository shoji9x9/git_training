import React from "react";
import "./App.css";
import { theme } from "./styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import { SearchQiitaItems } from "./pages/SearchQiitaItems";
import { Box, Typography } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          paddingTop: "40px",
          paddingBottom: "40px",
          paddingLeft: "100px",
          paddingRight: "100px",
        }}
      >
        {/* メッセージ表示エリア */}
        <Box margin={2}></Box>
        {/* 機能名 */}
        <Box margin={2}>
          <Typography variant={"h4"}>{"Qiita記事検索"}</Typography>
        </Box>
        {/* 各機能 */}
        <SearchQiitaItems />
      </Box>
    </ThemeProvider>
  );
}

export default App;
