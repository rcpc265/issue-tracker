import { z } from "zod";
import { Status } from "@prisma/client";

export const issueSchema = z
  .object({
    title: z
      .string()
      .min(1, { message: "Title is required." })
      .max(255, { message: "Title must be less than 255 characters." }),
    description: z
      .string()
      .min(1, { message: "Description is required." })
      .max(65535, {
        message: "Description must be less than 65535 characters.",
      }),
    status: z.nativeEnum(Status, {
      invalid_type_error: "Invalid status passed.",
    }),
  })
  .strict();

export const updateIssueSchema = issueSchema.partial().extend({
  userId: z.string().cuid({ message: "Invalid user id passed." }).nullish(),
});
