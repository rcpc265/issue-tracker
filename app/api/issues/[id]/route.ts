import { updateIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/[...nextauth]/authOptions";

interface Params {
  params: {
    id: string;
  };
}

const updateIssue = async (req: NextRequest, { params }: Params) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "You must be logged in to create an issue." },
      { status: 401 }
    );
  }

  const body: unknown = await req.json();
  const parsed = updateIssueSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(parsed.error.format(), { status: 400 });
  }

  if (parsed.data.userId) {
    const user = await prisma.user.findUnique({
      where: { id: parsed.data.userId },
    });
    if (!user) {
      return NextResponse.json(
        { error: "No user with this id exists." },
        { status: 404 }
      );
    }
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

  // Check if issue with this title already exists
  if (parsed.data.title) {
    const existingIssue = await prisma.issue.findFirst({
      where: {
        title: parsed.data.title,
        NOT: {
          id: +params.id,
        },
      },
    });

    if (existingIssue) {
      return NextResponse.json(
        { error: "An issue with this title already exists." },
        { status: 409 }
      );
    }
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: +params.id },
    data: { ...parsed.data },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
};

const deleteIssue = async (_req: NextRequest, { params }: Params) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "You must be logged in to create an issue." },
      { status: 401 }
    );
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

  await prisma.issue.delete({ where: { id: +params.id } });

  return NextResponse.json({ message: "Issue deleted." }, { status: 200 });
};

export { updateIssue as PUT, deleteIssue as DELETE };
