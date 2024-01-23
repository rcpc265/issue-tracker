import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { HiOutlinePencilAlt } from "react-icons/hi";

interface Props {
  id: number;
  showText?: boolean;
}

const EditIssueButton = ({ id, showText = true }: Props) => {
  return (
    <Button>
      <Link href={`/issues/edit/${id}`}>
        <Flex align="center" gap="2">
          <HiOutlinePencilAlt className="stroke-[2px] text-[14px]" />
          {showText && <span className="font-medium">Edit Issue</span>}
        </Flex>
      </Link>
    </Button>
  );
};
export default EditIssueButton;
