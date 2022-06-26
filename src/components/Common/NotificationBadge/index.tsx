import styled from "@emotion/styled";
import { Badge, BadgeProps } from "@mui/material";

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  "& .MuiBadge-badge": {
    left: -3,
    top: -3,
  },
}));

export default function CustomizedBadges({ children, ...props }: BadgeProps) {
  return (
    <StyledBadge
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      variant="dot"
      {...props}
    >
      {children}
    </StyledBadge>
  );
}
