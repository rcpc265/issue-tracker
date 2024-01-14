import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createIssueSchema = z
  .object({
    title: z.string().min(1).max(255),
    description: z.string().min(1),
  })
  .strict();

const createIssue = async (request: NextRequest) => {
  const body: unknown = await request.json();
  const parsed = createIssueSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(parsed.error.formErrors, { status: 400 });
  }

  const existingIssue = await prisma.issue.findFirst({
    where: { title: parsed.data.title },
  });

  if (existingIssue) {
    return NextResponse.json(
      { error: "An issue with this title already exists." },
      {
        status: 409,
      }
    );
  }

  const newIssue = await prisma.issue.create({
    data: { ...parsed.data },
  });

  return NextResponse.json(newIssue, { status: 201 });
};

export { createIssue as POST };
