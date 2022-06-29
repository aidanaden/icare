import { NominationDataTableData } from "@/interfaces";
import { deleteDraftNomination } from "@/lib/nominations";
import { MoreVert, Edit, FolderOpen, Delete } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import PrimaryButton from "../../PrimaryButton";
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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

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
    try {
      setDeleteLoading(true);
      const response = await deleteDraftNomination(case_id);
      if (response?.status_code === 200) {
        setDeleteSuccessOpen(true);
        setDeleteLoading(false);
        setDisplayedData(
          displayedData?.filter((data) => data.case_id !== case_id)
        );
      }
      handleClose();
    } catch (err) {
      console.error("error occurred while deleting: ", err);
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
            <ErrorStyledMenuItem onClick={() => setDeleteDialogOpen(true)}>
              <Delete style={{ color: "red" }} />
              Delete
            </ErrorStyledMenuItem>
            <Dialog
              open={deleteDialogOpen}
              onClose={() => setDeleteDialogOpen(false)}
            >
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this nomination?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <PrimaryButton
                  variant={"outlined"}
                  color="error"
                  onClick={() => setDeleteDialogOpen(false)}
                >
                  Cancel
                </PrimaryButton>
                <PrimaryButton onClick={handleDelete} loading={deleteLoading}>
                  Confirm
                </PrimaryButton>
              </DialogActions>
            </Dialog>
          </>
        )}
      </StyledMenu>
    </>
  );
}
