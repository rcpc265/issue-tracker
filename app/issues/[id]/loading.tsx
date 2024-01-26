import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { Skeleton } from "@/components";
import { Box, Card, Flex } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import IssueDetailsLayout from "../_components/IssueDetailsLayout";
import AssigneeSelectSkeleton from "./AssigneeSelectSkeleton";

const LoadingIssueDetailPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <IssueDetailsLayout>
      <Flex gap="5">
        {/* Issue details */}
        <Box className="w-full">
          <Flex gap="3" align="center">
            {/* Issue title */}
            <Skeleton height={22} width={220} />
            {/* Issue status */}
            <Skeleton height={20} width={45} />
          </Flex>
          <Card className="prose" mt="5">
            {/* Issue description */}
            <Skeleton count={3} />
          </Card>
          <Box mt="2">
            {/* Issue created at */}
            <Skeleton width={150} />
          </Box>
        </Box>
        {session && (
          <Flex className="w-[200px]" direction="column" gap="3" mt="4">
            <AssigneeSelectSkeleton widthFull={true} />
            {/* Delete Issue Button */}
            <Skeleton />
            {/* Edit Issue Button */}
            <Skeleton />
          </Flex>
        )}
      </Flex>
    </IssueDetailsLayout>
  );
};
export default LoadingIssueDetailPage;
