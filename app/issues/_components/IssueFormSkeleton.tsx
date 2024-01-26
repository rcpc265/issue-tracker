import { Skeleton } from "@/components";
import { Box, Button, Card, Flex, Heading } from "@radix-ui/themes";
import AssigneeSelectSkeleton from "../[id]/AssigneeSelectSkeleton";
interface Props {
  edit?: boolean;
}

const IssueFormSkeleton = ({ edit = false }: Props) => {
  return (
    <Box className="max-w-xl mx-auto">
      <Flex gap="3" direction="column">
        <Flex justify="between">
          <Heading>{edit ? "Edit Issue" : "New Issue"}</Heading>
          {edit && <AssigneeSelectSkeleton />}
        </Flex>

        <Flex mt="2" gap="3" className="w-full">
          {/* Issue title */}
          <Box className="w-full">
            <Skeleton height={26} />
          </Box>
          {/* Issue status */}
          <Skeleton height={26} width={90} />
        </Flex>

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
