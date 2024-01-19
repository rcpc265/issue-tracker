import IssueStatusBadge from "@/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({ where: { id: +id } });

  if (!issue) notFound();

  return (
    <div>
      <Flex gap="3">
        <Heading>{issue.title}</Heading>
        <IssueStatusBadge status={issue.status} />
      </Flex>
      <Box my="3">
        <Text>{issue.createdAt.toDateString()}</Text>
      </Box>
      <Card>
        <Text>{issue.description}</Text>
      </Card>
    </div>
  );
};
export default IssueDetailPage;
