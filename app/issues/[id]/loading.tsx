import { Skeleton } from "@/components";
import { Box, Card, Flex } from "@radix-ui/themes";

const LoadingIssueDetailPage = () => {
  return (
    <Box className="max-w-lg mx-auto">
      <Flex gap="3" align="center">
        {/* Issue title */}
        <Skeleton height={22} width={220} />

        {/* Issue status */}
        <Skeleton width={45} />
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
  );
};
export default LoadingIssueDetailPage;
