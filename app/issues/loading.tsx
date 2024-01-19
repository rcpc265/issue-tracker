import { Table } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssuePage = () => {
  const issues = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <>
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
            <Table.Row key={issue}>
              <Table.Cell>
                {/* Issue title */}
                <Skeleton width="75%" />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {/* Issue status */}
                <Skeleton width="15%" />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {/* Issue created date */}
                <Skeleton width="30%" />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};
export default LoadingIssuePage;
