import BlueBadge from "@/components/Common/Badge/BlueBadge";
import GrayBadge from "@/components/Common/Badge/GrayBadge";
import GreenBadge from "@/components/Common/Badge/GreenBadge";
import OrangeBadge from "@/components/Common/Badge/OrangeBadge";
import PurpleBadge from "@/components/Common/Badge/PurpleBadge";
import RedBadge from "@/components/Common/Badge/RedBadge";
import { EndorsementStatus, NominationFormStatus } from "@/enums";
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
    fontWeight: 500,
    "&:hover": {
      backgroundColor: "#F5F6F9",
    },
  },
}));

interface TableCellProps {
  value: string | number | boolean | Date | undefined;
  column: Column;
}

interface CategoryTableCellProps {
  value: NominationFormStatus;
  column: Column;
}

export const CategoryTableCell = ({
  value,
  column,
}: CategoryTableCellProps) => {
  if (value) {
    return (
      <StyledTableCell key={column.id} align={column.align} sx={{ px: 4 }}>
        {value === NominationFormStatus.ENDORSED ? (
          <GreenBadge>{value}</GreenBadge>
        ) : value === NominationFormStatus.SUBMITTED ? (
          <BlueBadge>{value}</BlueBadge>
        ) : value === NominationFormStatus.PENDING ? (
          <GrayBadge>{value}</GrayBadge>
        ) : (
          <RedBadge>{value}</RedBadge>
        )}
      </StyledTableCell>
    );
  } else {
    return <></>;
  }
};

export const DateTableCell = ({ value, column }: TableCellProps) => {
  if (value != undefined && value instanceof Date) {
    return (
      <StyledTableCell key={column.id} align={column.align} sx={{ px: 4 }}>
        {column.format(value)}
      </StyledTableCell>
    );
  } else {
    return (
      <StyledTableCell key={column.id} align={column.align} sx={{ px: 4 }}>
        {value?.toString()}
      </StyledTableCell>
    );
  }
};
