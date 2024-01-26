import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import IssueDetailsLayout from "../_components/IssueDetailsLayout";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const session = await getServerSession(authOptions);
  const issue = await prisma.issue.findUnique({ where: { id: +id } });

  if (!issue) notFound();

  return (
    <IssueDetailsLayout>
      <Flex gap="5">
        <IssueDetails issue={issue} />
        {session && (
          <Flex className="w-[200px]" direction="column" gap="3" mt="4">
            <AssigneeSelect issue={issue} widthFull />
            <DeleteIssueButton id={issue.id} />
            <EditIssueButton id={issue.id} />
          </Flex>
        )}
      </Flex>
    </IssueDetailsLayout>
  );
};
export default IssueDetailPage;
