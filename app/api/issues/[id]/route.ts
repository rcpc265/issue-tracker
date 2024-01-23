import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

const updateIssue = async (req: NextRequest, { params }: Params) => {
  const body: unknown = await req.json();
  const parsed = issueSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(parsed.error.format(), { status: 400 });
  }

  const currentIssue = await prisma.issue.findFirst({
    where: { id: +params.id },
  });

  if (!currentIssue) {
    return NextResponse.json(
      { error: "No issue with this id exists." },
      { status: 404 }
    );
  }

  const existingIssue = await prisma.issue.findFirst({
    where: {
      title: parsed.data.title,
      id: {
        not: +params.id,
      },
    },
  });

  if (existingIssue) {
    return NextResponse.json(
      { error: "An issue with this title already exists." },
      { status: 409 }
    );
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: +params.id },
    data: { ...parsed.data },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
};

const deleteIssue = async (_req: NextRequest, { params }: Params) => {
  const currentIssue = await prisma.issue.findFirst({
    where: { id: +params.id },
  });

  if (!currentIssue) {
    return NextResponse.json(
      { error: "No issue with this id exists." },
      { status: 404 }
    );
  }

  await prisma.issue.delete({ where: { id: +params.id } });

  return NextResponse.json({ message: "Issue deleted." }, { status: 200 });
};

export { updateIssue as PUT, deleteIssue as DELETE };
