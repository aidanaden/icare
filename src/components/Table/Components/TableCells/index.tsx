import BlueBadge from "@/components/Common/Badge/BlueBadge";
import GrayBadge from "@/components/Common/Badge/GrayBadge";
import GreenBadge from "@/components/Common/Badge/GreenBadge";
import OrangeBadge from "@/components/Common/Badge/OrangeBadge";
import PurpleBadge from "@/components/Common/Badge/PurpleBadge";
import RedBadge from "@/components/Common/Badge/RedBadge";
import { NominationFormStatus, ServiceLevel } from "@/enums";
import { CommitteeMemberVote } from "@/interfaces";
import styled from "@emotion/styled";
import {
  Avatar,
  AvatarGroup,
  Badge,
  TableCell,
  tableCellClasses,
} from "@mui/material";
import { Column } from "../Columns";
import { teal, lightBlue, lightGreen } from "@mui/material/colors";
import AmberBadge from "@/components/Common/Badge/AmberBadge";
import NotificationBadge from "@/components/Common/NotificationBadge";

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

interface TextTableCellProps {
  column: Column<any>;
  value: string | ServiceLevel;
  hasRightBorder?: boolean;
  hasBadge?: boolean;
}

export const BadgeTableCell = ({ value, column }: TextTableCellProps) => {
  return (
    <StyledTableCell
      key={`${column.id.toString()}`}
      align={column.align}
      sx={{ px: 4 }}
    >
      {value === NominationFormStatus.ENDORSED ? (
        <GreenBadge>{value.toString()}</GreenBadge>
      ) : value === NominationFormStatus.PENDING ? (
        <GrayBadge>{value.toString()}</GrayBadge>
      ) : value === NominationFormStatus.SUBMITTED ? (
        <BlueBadge>{value.toString()}</BlueBadge>
      ) : value === NominationFormStatus.SHORTLISTED ? (
        <PurpleBadge>{value.toString()}</PurpleBadge>
      ) : value === NominationFormStatus.AWARDED ? (
        <OrangeBadge>{value.toString()}</OrangeBadge>
      ) : value === NominationFormStatus.CHAMPION ? (
        <AmberBadge>{value.toString()}</AmberBadge>
      ) : (
        <RedBadge>{value?.toString()}</RedBadge>
      )}
    </StyledTableCell>
  );
};

export const TextTableCell = ({
  value,
  column,
  hasRightBorder,
  hasBadge,
}: TextTableCellProps) => {
  return (
    <StyledTableCell
      key={`${column.id.toString()}`}
      align={column.align}
      sx={{
        px: 4,
        borderRight: hasRightBorder ? 1 : "none",
        borderWidth: "1px",
        borderColor: "rgba(0, 0, 0, 0.12)",
      }}
    >
      {hasBadge ? (
        <NotificationBadge badgeContent={"New"} color="primary">
          {value.toString()}
        </NotificationBadge>
      ) : (
        value.toString()
      )}
    </StyledTableCell>
  );
};

interface CommitteeVoteTableCellProps {
  value: CommitteeMemberVote[];
  column: Column<any>;
}

const getAvatarColor = (i: number) => {
  if (i === 0) {
    return teal[300];
  } else if (i === 1) {
    return lightBlue[300];
  } else {
    return lightGreen[300];
  }
};

export const CommitteeVoteTableCell = ({
  value,
  column,
}: CommitteeVoteTableCellProps) => {
  return (
    <StyledTableCell
      key={`${column.id.toString()}`}
      align={column.align}
      sx={{ px: 4 }}
    >
      <AvatarGroup
        max={3}
        sx={{
          alignItems: "self-start",
          justifyContent: "left",
        }}
      >
        {value.map((committeeMemberVote, i) => {
          return (
            <Avatar
              key={`avatar icon ${i}`}
              sx={{
                bgcolor: `${getAvatarColor(i)}`,
                opacity: committeeMemberVote.champion_status ? 1 : 0.3,
                width: 32,
                height: 32,
              }}
            >
              {committeeMemberVote.committee_name.slice(0, 1)}
            </Avatar>
          );
        })}
      </AvatarGroup>
    </StyledTableCell>
  );
};
