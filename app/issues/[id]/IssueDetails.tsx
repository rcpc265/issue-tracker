import IssueStatusBadge from "@/components/IssueStatusBadge";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import EditIssueButton from "./EditIssueButton";
import { Issue } from "@prisma/client";

interface Props {
  issue: Issue;
}

const IssueDetails = ({ issue }: Props) => {
  return (
    <>
      <Flex justify="between">
        <Flex gap="3" align="center">
          <Heading>{issue.title}</Heading>
          <IssueStatusBadge status={issue.status} />
        </Flex>
        <EditIssueButton id={issue.id} />
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
export default IssueDetails;
