import BlueBadge from "@/components/Common/Badge/BlueBadge";
import GreenBadge from "@/components/Common/Badge/GreenBadge";
import OrangeBadge from "@/components/Common/Badge/OrangeBadge";
import PurpleBadge from "@/components/Common/Badge/PurpleBadge";
import RedBadge from "@/components/Common/Badge/RedBadge";
import { NominationFormStatus } from "@/enums";
import styled from "@emotion/styled";
import { TableCell, tableCellClasses } from "@mui/material";
import { Column } from "../Columns";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F5F6F9",
    color: "#637381",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    "&:hover": {
      backgroundColor: "#F5F6F9",
    },
  },
}));

interface TextTableCellProps {
  value: string | Date;
  column: Column;
}

export const TextTableCell = ({ value, column }: TextTableCellProps) => {
  return (
    <StyledTableCell key={column.id} align={column.align} sx={{ px: 4 }}>
      {value === NominationFormStatus.ENDORSED ? (
        <GreenBadge>{value.toString()}</GreenBadge>
      ) : value === NominationFormStatus.SUBMITTED ? (
        <BlueBadge>{value.toString()}</BlueBadge>
      ) : value === NominationFormStatus.SHORTLISTED ? (
        <PurpleBadge>{value.toString()}</PurpleBadge>
      ) : value === NominationFormStatus.AWARDED ? (
        <OrangeBadge>{value.toString()}</OrangeBadge>
      ) : (
        <RedBadge>{value.toString()}</RedBadge>
      )}
    </StyledTableCell>
  );
};

export const DateTableCell = ({ value, column }: TextTableCellProps) => {
  return (
    <StyledTableCell key={column.id} align={column.align} sx={{ px: 4 }}>
      {column.format && value instanceof Date
        ? column.format(value)
        : value.toString()}
    </StyledTableCell>
  );
};
