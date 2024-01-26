import { Skeleton } from "@/components";

const AssigneeSelectSkeleton = ({
  widthFull = false,
}: {
  widthFull?: boolean;
}) => <Skeleton width={widthFull ? "100%" : 130} height={28} />;

export default AssigneeSelectSkeleton;
