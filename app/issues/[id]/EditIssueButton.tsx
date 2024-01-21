import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { HiOutlinePencilAlt } from "react-icons/hi";

const EditIssueButton = ({ id }: { id: number }) => {
  return (
    <Button>
      <HiOutlinePencilAlt className="stroke-[2px] text-[14px]" />
      <Link href={`/issues/${id}/edit`} className="font-medium">
        Edit Issue
      </Link>
    </Button>
  );
};
export default EditIssueButton;
