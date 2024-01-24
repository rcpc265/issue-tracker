import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import IssueStatusBadge from "@/components/IssueStatusBadge";
import { Issue } from "@prisma/client";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import ReactMarkdown from "react-markdown";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";

interface Props {
  issue: Issue;
}

const IssueDetails = async ({ issue }: Props) => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Flex justify="between">
        <Flex gap="3" align="center">
          <Heading>{issue.title}</Heading>
          <IssueStatusBadge status={issue.status} />
        </Flex>
        <AssigneeSelect />
      </Flex>
      <Card className="prose" mt="5">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
      <Box mt="2">
        <Text size="2" className="italic">
          {issue.createdAt.toDateString()}
        </Text>
      </Box>

      {session && (
        <Flex gap="3" mt="4">
          <DeleteIssueButton id={issue.id} />
          <EditIssueButton id={issue.id} />
        </Flex>
      )}
    </>
  );
};
export default IssueDetails;
