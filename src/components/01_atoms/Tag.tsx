/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Typography } from "@mui/material";

type TagProps = {
  children: React.ReactNode;
};

const tagStyle = css({
  backgroundColor: "#f8f8f8",
  border: "1px solid #ddd",
  borderRadius: "3px",
  fontSize: "12px",
  padding: "3px 5px",
  margin: "2px",
  display: "inline-block",
});

export function Tag(props: TagProps): JSX.Element {
  const { children } = props;
  return (
    <Typography component="span" css={tagStyle}>
      {children}
    </Typography>
  );
}
