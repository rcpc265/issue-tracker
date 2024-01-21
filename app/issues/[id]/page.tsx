import IssueStatusBadge from "@/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HiOutlinePencilAlt } from "react-icons/hi";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({ where: { id: +id } });

  if (!issue) notFound();

  return (
    <Box className="max-w-lg mx-auto">
      <Flex justify="between">
        <Flex gap="3" align="center">
          <Heading>{issue.title}</Heading>
          <IssueStatusBadge status={issue.status} />
        </Flex>

        <Button>
          <HiOutlinePencilAlt className="stroke-[2px] text-[14px]" />
          <Link href={`/issues/${id}/edit`} className="font-medium">
            Edit Issue
          </Link>
        </Button>
      </Flex>
      <Card className="prose" mt="5">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
      <Box mt="2">
        <Text size="2" className="italic">
          {issue.createdAt.toDateString()}
        </Text>
      </Box>
    </Box>
  );
};
export default IssueDetailPage;
