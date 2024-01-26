import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "../../_components/IssueFormSkeleton";
const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton edit={true} />,
});

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params: { id } }: Props) => {
  console.log("Editing issue with id:", id);
  const issue = await prisma.issue.findUnique({ where: { id: +id } });

  console.log("Editing issue with id:", id);
  if (!issue) return notFound();

  return <IssueForm issue={issue} />;
};
export default EditIssuePage;
