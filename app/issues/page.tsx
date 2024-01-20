import { Flex, Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import IssueStatusBadge from "@/components/IssueStatusBadge";
import IssueActions from "./IssueActions";
import Link from "@/components/Link";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <IssueActions />
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
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};
export default IssuesPage;
