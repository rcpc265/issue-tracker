import { Skeleton } from "@/components";
import { Box, Button, Card, Flex, Heading } from "@radix-ui/themes";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl mx-auto">
      <Flex gap="3" direction="column">
        <Heading>New Issue</Heading>
        <Box mt="2">
          <Skeleton height={24} />
        </Box>
        <Card style={{ height: "370px", marginBottom: "35px" }}>
          <Skeleton count={14} />
        </Card>
        <Flex gap="2">
          <Button>Submit</Button>
          <Button color="red">Cancel</Button>
        </Flex>
      </Flex>
    </Box>
  );
};
export default IssueFormSkeleton;
