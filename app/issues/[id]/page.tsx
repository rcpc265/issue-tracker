import IssueStatusBadge from "@/components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";
import prisma from "@/prisma/client";
import { Box, Card, Em, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({ where: { id: +id } });

  if (!issue) notFound();

  return (
    <>
      <Flex gap="3">
        <Heading>{issue.title}</Heading>
        <IssueStatusBadge status={issue.status} />
      </Flex>
      <Card className="prose" mt="5">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
      <Box mt="2">
        <Text size="2" className="italic">
          {issue.createdAt.toDateString()}
        </Text>
      </Box>
    </>
  );
};
export default IssueDetailPage;
