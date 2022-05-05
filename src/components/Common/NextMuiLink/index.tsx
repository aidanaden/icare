import NextLink from "next/link";
import MuiLink, { LinkProps } from "@mui/material/Link";

export interface NextMuiLinkProps extends LinkProps {
  href: string;
  children: React.ReactNode;
}

export default function index({ href, children, ...other }: NextMuiLinkProps) {
  return (
    <NextLink href={href} passHref>
      <MuiLink underline="none" {...other}>
        {children}
      </MuiLink>
    </NextLink>
  );
}
