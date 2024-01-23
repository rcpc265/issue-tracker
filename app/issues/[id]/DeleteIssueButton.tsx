"use client";
import { Spinner } from "@/components";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

interface Props {
  id: number;
  showText?: boolean;
}

const DeleteIssueButton = ({ id, showText = true }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <Button
      color="red"
      disabled={isLoading}
      onClick={async () => {
        setIsLoading(true);
        await axios.delete(`/api/issues/${id}`).catch((_err) => {
          console.log("An error occurred while trying to delete the issue.");
          setIsLoading(false);
        });
        router.push("/issues");
        router.refresh();
      }}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <FiTrash2 className="stroke-[2px] text-[14px]" />
      )}
      {showText && <span className="font-medium">Delete Issue</span>}
    </Button>
  );
};
export default DeleteIssueButton;
