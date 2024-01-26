import { Box } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

const IssueDetailsLayout = ({ children }: PropsWithChildren) => (
  <Box className="max-w-2xl mx-auto">{children}</Box>
);
export default IssueDetailsLayout;
