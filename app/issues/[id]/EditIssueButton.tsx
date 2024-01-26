import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { HiOutlinePencilAlt } from "react-icons/hi";

interface Props {
  id: number;
  showText?: boolean;
}

const EditIssueButton = async ({ id, showText = true }: Props) => (
  <Button>
    <Link href={`/issues/${id}/edit`}>
      <Flex align="center" gap="2">
        <HiOutlinePencilAlt className="stroke-[2px] text-[14px]" />
        {showText && <span className="font-medium">Edit Issue</span>}
      </Flex>
    </Link>
  </Button>
);

export default EditIssueButton;
