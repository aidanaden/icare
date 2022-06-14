import { NominationDataTableData } from "@/interfaces";
import { deleteDraftNomination } from "@/lib/nominations";
import { MoreVert, Edit, FolderOpen, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import ErrorStyledMenuItem from "../ErrorStyledMenuItem";
import StyledMenu from "../StyledMenu";
import StyledMenuItem from "../StyledMenuItem";

interface NominationDataTableMenuProps {
  case_id: string;
  isDeletable: boolean;
  isEditable: boolean;
  displayedData?: NominationDataTableData[];
  setDisplayedData: Dispatch<
    SetStateAction<NominationDataTableData[] | undefined>
  >;
  setDeleteSuccessOpen: Dispatch<SetStateAction<boolean>>;
  setDeleteErrorOpen: Dispatch<SetStateAction<boolean>>;
  viewText?: string;
}

export default function Menu({
  case_id,
  isEditable,
  isDeletable,
  displayedData,
  setDisplayedData,
  setDeleteSuccessOpen,
  setDeleteErrorOpen,
  viewText = "View",
}: NominationDataTableMenuProps) {
  const router = useRouter();
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
    router.push(`/nominations/edit/${case_id}`);
    handleClose();
  };

  const handleDelete = async () => {
    console.log("delete button pressed!");
    try {
      const response = await deleteDraftNomination(case_id);
      if (response?.status_code === 200) {
        setDeleteSuccessOpen(true);
        setDisplayedData(
          displayedData?.filter((data) => data.case_id !== case_id)
        );
      }
      handleClose();
    } catch (err) {
      console.log("error occurred while deleting: ", err);
      setDeleteErrorOpen(true);
    }
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
          {viewText}
        </StyledMenuItem>
        {isEditable && (
          <StyledMenuItem onClick={handleEdit}>
            <Edit />
            Edit
          </StyledMenuItem>
        )}
        {isDeletable && (
          <>
            <ErrorStyledMenuItem onClick={handleDelete}>
              <Delete style={{ color: "red" }} />
              Delete
            </ErrorStyledMenuItem>
          </>
        )}
      </StyledMenu>
    </>
  );
}
