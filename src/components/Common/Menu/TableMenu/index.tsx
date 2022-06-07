import useAuth from "@/hooks/useAuth";
import { deleteDraftNomination } from "@/lib/nominations";
import { MoreVert, Edit, FolderOpen, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";
import { useState } from "react";
import ErrorStyledMenuItem from "../ErrorStyledMenuItem";
import StyledMenu from "../StyledMenu";
import StyledMenuItem from "../StyledMenuItem";

interface NominationDataTableMenuProps {
  case_id: string;
  isDeletable: boolean;
}

export default function Menu({
  case_id,
  isDeletable,
}: NominationDataTableMenuProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleView = () => {
    router.push(`/nominations/${case_id}`);
    handleClose();
  };

  const handleEdit = () => {
    console.log("edit button pressed!");
  };

  const handleDelete = () => {
    console.log("delete button pressed!");
    deleteDraftNomination(case_id);
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
        <StyledMenuItem onClick={handleView}>
          <FolderOpen />
          View
        </StyledMenuItem>
        <StyledMenuItem onClick={handleEdit}>
          <Edit />
          Edit
        </StyledMenuItem>
        {isDeletable && (
          <ErrorStyledMenuItem onClick={handleDelete}>
            <Delete style={{ color: "red" }} />
            Delete
          </ErrorStyledMenuItem>
        )}
      </StyledMenu>
    </>
  );
}
