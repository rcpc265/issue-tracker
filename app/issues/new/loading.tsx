import { Skeleton } from "@/components";
import { Box, Button, Card, Flex, Heading } from "@radix-ui/themes";

export const MDESkeleton = () => (
  <Card style={{ height: "370px", marginBottom: "35px" }}>
    <Skeleton count={14} />
  </Card>
);

const LoadingNewIssuePage = () => {
  return (
    <Box className="max-w-xl mx-auto">
      <Flex gap="3" direction="column">
        <Heading>New Issue</Heading>
        <Box mt="2">
          <Skeleton height={24} />
        </Box>
        <MDESkeleton />
        <Button>Submit</Button>
      </Flex>
    </Box>
  );
};
export default LoadingNewIssuePage;
