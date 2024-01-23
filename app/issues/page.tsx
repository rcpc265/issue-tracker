import { IssueStatusBadge, Link } from "@/components";
import prisma from "@/prisma/client";
import { Box, Button, Flex, Table, Text } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import DeleteIssueButton from "./[id]/DeleteIssueButton";
import EditIssueButton from "./[id]/EditIssueButton";
import { FiPlusCircle } from "react-icons/fi";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <IssueActions />
      {issues.length === 0 ? (
        <Flex
          align="center"
          justify="center"
          direction="column"
          gap="3"
          className="h-[calc(100vh-10rem)]"
        >
          <Link href="/issues/new">
            <FiPlusCircle className="text-black hover:scale-105 rounded-full transition-all text-[50px]" />
          </Link>
          <Text>No issues found. Start creating issues now!</Text>
          <Button>
            <Link href="/issues/new">
              <span className="text-white">Create issue</span>
            </Link>
          </Button>
        </Flex>
      ) : (
        <Table.Root variant="surface" mt="5">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Status
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Created
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Flex gap="2" align="center">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <span className="md:hidden">
                      <IssueStatusBadge status={issue.status} />
                    </span>
                  </Flex>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </Table.Cell>
                <Table.Cell>
                  <Flex gap="2">
                    <EditIssueButton id={issue.id} showText={false} />
                    <DeleteIssueButton id={issue.id} showText={false} />
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </>
  );
};

export default IssuesPage;

export const dynamic = "force-dynamic";
