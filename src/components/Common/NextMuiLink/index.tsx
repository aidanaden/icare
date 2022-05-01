import NextLink from "next/link";
import MuiLink, { LinkProps } from "@mui/material/Link";

interface NextMuiLinkProps extends LinkProps {
  href: string;
  children: React.ReactNode;
}

export default function index({ href, children, ...other }: NextMuiLinkProps) {
  return (
    <NextLink href={href} passHref>
      <MuiLink
        color="secondary.main"
        underline="hover"
        fontSize={{ xs: "medium", md: "medium" }}
        minWidth="64px"
        {...other}
      >
        {children}
      </MuiLink>
    </NextLink>
  );
}
