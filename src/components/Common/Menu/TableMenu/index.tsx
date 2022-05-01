import { MoreVert, Edit, FolderOpen, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import ErrorStyledMenuItem from "../ErrorStyledMenuItem";
import StyledMenu from "../StyledMenu";
import StyledMenuItem from "../StyledMenuItem";

export default function Menu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        color="default"
        onClick={handleClick}
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <MoreVert />
      </IconButton>
      <StyledMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <StyledMenuItem onClick={handleClose}>
          <FolderOpen />
          View
        </StyledMenuItem>
        <StyledMenuItem onClick={handleClose}>
          <Edit />
          Edit
        </StyledMenuItem>
        <ErrorStyledMenuItem onClick={handleClose}>
          <Delete style={{ color: "red" }} />
          Delete
        </ErrorStyledMenuItem>
      </StyledMenu>
    </>
  );
}
