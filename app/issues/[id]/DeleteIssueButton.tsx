"use client";
import { Spinner } from "@/components";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
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
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">
          {isLoading ? (
            <Spinner />
          ) : (
            <FiTrash2 className="stroke-[2px] text-[14px]" />
          )}
          {showText && <span className="font-medium">Delete Issue</span>}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Delete Issue</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure? This issue will be permanently deleted.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="red"
              onClick={async () => {
                setIsLoading(true);
                await axios.delete(`/api/issues/${id}`).catch((_err) => {
                  console.log(
                    "An error occurred while trying to delete the issue."
                  );
                  setIsLoading(false);
                });
                router.push("/issues");
                router.refresh();
              }}
            >
              Delete Issue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

// "use client";
// import { Spinner } from "@/components";
// import { Button } from "@radix-ui/themes";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { FiTrash2 } from "react-icons/fi";

// interface Props {
//   id: number;
//   showText?: boolean;
// }

// const DeleteIssueButton = ({ id, showText = true }: Props) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   return (
//     <Button
//       color="red"
//       disabled={isLoading}
//       onClick={async () => {
//         setIsLoading(true);
//         await axios.delete(`/api/issues/${id}`).catch((_err) => {
//           console.log("An error occurred while trying to delete the issue.");
//           setIsLoading(false);
//         });
//         router.push("/issues");
//         router.refresh();
//       }}
//     >
//       {isLoading ? (
//         <Spinner />
//       ) : (
//         <FiTrash2 className="stroke-[2px] text-[14px]" />
//       )}
//       {showText && <span className="font-medium">Delete Issue</span>}
//     </Button>
//   );
// };
export default DeleteIssueButton;
