import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const getUsers = async (req: NextRequest) => {
  const users = await prisma.user.findMany({
    orderBy: { name: "asc" },
  });

  return NextResponse.json(users);
};

export { getUsers as GET };
