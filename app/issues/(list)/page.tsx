import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { IssueStatusBadge, Link } from "@/components";
import prisma from "@/prisma/client";
import { Button, Flex, Table, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { FiPlusCircle } from "react-icons/fi";
import DeleteIssueButton from "../[id]/DeleteIssueButton";
import EditIssueButton from "../[id]/EditIssueButton";
import IssueActions from "./IssueActions";

const IssuesPage = async () => {
  const session = await getServerSession(authOptions);

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
              {session && (
                <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
              )}
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
                {session && (
                  <Table.Cell>
                    <Flex gap="2">
                      <EditIssueButton id={issue.id} showText={false} />
                      <DeleteIssueButton id={issue.id} showText={false} />
                    </Flex>
                  </Table.Cell>
                )}
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
