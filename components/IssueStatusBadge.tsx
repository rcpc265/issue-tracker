import { Status } from "@prisma/client";
import { Badge, badgePropDefs } from "@radix-ui/themes";

export type RadixColors = (typeof badgePropDefs.color.values)[number];

const statusMap: Record<Status, { label: string; color: RadixColors }> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "blue" },
  CLOSED: { label: "Closed", color: "green" },
};

interface Props {
  status: Status;
}

const IssueStatusBadge = ({ status }: Props) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
