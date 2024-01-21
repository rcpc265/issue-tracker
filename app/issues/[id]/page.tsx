import prisma from "@/prisma/client";
import { Box } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import IssueDetails from "./IssueDetails";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({ where: { id: +id } });

  if (!issue) notFound();

  return (
    <Box className="max-w-lg mx-auto">
      <IssueDetails issue={issue} />
    </Box>
  );
};
export default IssueDetailPage;
