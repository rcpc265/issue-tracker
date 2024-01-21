import { Skeleton } from "@/components";
import { Box, Button, Flex, Heading } from "@radix-ui/themes";
import MDESkeleton from "../_components/MDESkeleton";

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
