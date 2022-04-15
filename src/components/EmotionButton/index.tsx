/** @jsxRuntime classic /
/* @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/react";

const buttonStyle = css({
  padding: "32px",
  backgroundColor: "hotpink",
  fontSize: "24px",
  borderRadius: "4px",
  ":hover": {
    color: "white",
  },
});

const index = () => {
  return <div css={buttonStyle}>Hover to change color.</div>;
};

export default index;
