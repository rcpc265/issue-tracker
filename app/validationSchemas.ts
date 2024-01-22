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
      .max(1000, { message: "Description must be less than 1000 characters." }),
    status: z.nativeEnum(Status, {
      invalid_type_error: "Invalid status passed.",
    }),
  })
  .strict();
