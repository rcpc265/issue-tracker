import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});
import { notFound } from "next/navigation";
import IssueFormSkeleton from "./loading";

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params: { id } }: Props) => {
  if (!id) return notFound();
  const issue = await prisma.issue.findUnique({ where: { id: +id } });

  if (!issue) return notFound();

  return <IssueForm issue={issue} />;
};
export default EditIssuePage;
