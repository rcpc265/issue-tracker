import { IssueStatusBadge } from "@/components";
import { Issue } from "@prisma/client";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

interface Props {
  issue: Issue;
}

const IssueDetails = async ({ issue }: Props) => {
  return (
    <Box className="w-full">
      <Flex justify="between">
        <Flex gap="3" align="center">
          <Heading>{issue.title}</Heading>
          <IssueStatusBadge status={issue.status} />
        </Flex>
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
export default IssueDetails;
