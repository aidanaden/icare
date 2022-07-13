import styled from "@emotion/styled";
import { Badge, BadgeProps } from "@mui/material";

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  "& .MuiBadge-badge": {
    left: -3,
    top: -3,
    color: "red",
    backgroundColor: "transparent",
    fontSize: "14px",
  },
}));

export default function CustomizedBadges({ children, ...props }: BadgeProps) {
  return (
    <StyledBadge
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      //   variant="dot"
      badgeContent={"*"}
      {...props}
    >
      {children}
    </StyledBadge>
  );
}
