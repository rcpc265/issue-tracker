"use client";
import { issueSchema } from "@/app/validationSchemas";
import { ErrorMessage, Spinner } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Callout,
  Flex,
  Heading,
  Select,
  TextField,
} from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaExclamationTriangle } from "react-icons/fa";
import { z } from "zod";
import MDESkeleton from "./MDESkeleton";
import { Issue, Status } from "@prisma/client";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  loading: () => <MDESkeleton />,
  ssr: false,
});

type IssueFormData = z.infer<typeof issueSchema>;

const STATUS_TYPES = Object.values(Status);
const STATUS_COLORS_CLASS: Record<Status, string> = {
  [Status.OPEN]: "text-red-500",
  [Status.IN_PROGRESS]: "text-violet-500",
  [Status.CLOSED]: "text-green-500",
};

const IssueForm = ({ issue: previousIssue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<IssueFormData>({
    defaultValues: previousIssue
      ? {
          description: previousIssue.description,
          status: previousIssue.status,
          title: previousIssue.title,
        }
      : { status: Status.OPEN },
    resolver: zodResolver(issueSchema),
    mode: "onTouched",
  });
  const [submissionError, setSubmissionError] = useState("");

  const onSubmit = async (data: IssueFormData) => {
    try {
      if (previousIssue) {
        await axios.put(`/api/issues/${previousIssue.id}`, data);
        router.push(`/issues`);
        return router.refresh();
      }

      await axios.post("/api/issues", data);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.status === 409) {
          setError("title", {
            type: "manual",
            message: "An issue with this title already exists.",
          });
        } else {
          setSubmissionError("An unexpected error occurred.");
        }
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <Flex justify="between">
          <Heading>{previousIssue ? "Edit Issue" : "New Issue"}</Heading>
          {previousIssue && (
            <Controller
              name="status"
              control={control}
              defaultValue="OPEN"
              render={({ field }) => (
                <Select.Root onValueChange={field.onChange} value={field.value}>
                  <Select.Trigger />
                  <Select.Content>
                    {STATUS_TYPES.map((status) => (
                      <Select.Item
                        key={status}
                        value={status}
                        className={`font-medium ${STATUS_COLORS_CLASS[status]}`}
                      >
                        {status.replace("_", " ")}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              )}
            />
          )}
        </Flex>
        {submissionError && (
          <Callout.Root color="red" role="alert">
            <Callout.Icon>
              <FaExclamationTriangle />
            </Callout.Icon>
            <Callout.Text>{submissionError}</Callout.Text>
          </Callout.Root>
        )}
        <TextField.Root>
          <TextField.Input {...register("title")} placeholder="Title" />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <SimpleMDE
              onChange={field.onChange}
              events={{
                blur: field.onBlur,
              }}
              value={field.value}
              placeholder="Description"
            />
          )}
        />
        {errors.description && (
          <Box style={{ marginTop: "-24px" }}>
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          </Box>
        )}
        <Button type="submit" disabled={isSubmitting}>
          Submit
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};
export default IssueForm;
