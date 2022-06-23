import { ListItem, ListItemProps } from "@mui/material";

export default function index({ children, ...others }: ListItemProps) {
  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        mb: 1,
        py: 0,
        px: 2,
        // width: 280,
      }}
      {...others}
    >
      {children}
    </ListItem>
  );
}
