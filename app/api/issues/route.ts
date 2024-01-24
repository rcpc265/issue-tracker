import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "@/app/validationSchemas";
import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/authOptions";

const createIssue = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "You must be logged in to create an issue." },
      { status: 401 }
    );
  }
  const body: unknown = await request.json();
  const parsed = issueSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(parsed.error.format(), { status: 400 });
  }

  const existingIssue = await prisma.issue.findFirst({
    where: { title: parsed.data.title },
  });

  if (existingIssue) {
    return NextResponse.json(
      { error: "An issue with this title already exists." },
      { status: 409 }
    );
  }

  const newIssue = await prisma.issue.create({
    data: { ...parsed.data },
  });

  return NextResponse.json(newIssue, { status: 201 });
};

export { createIssue as POST };
