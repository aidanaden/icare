import NextMuiLink, { NextMuiLinkProps } from "@/components/Common/NextMuiLink";

export default function index({ href, children, ...other }: NextMuiLinkProps) {
  return (
    <NextMuiLink underline="hover" fontSize="14px" href={href} {...other}>
      {children}
    </NextMuiLink>
  );
}
