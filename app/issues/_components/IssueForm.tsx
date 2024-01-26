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
  Select, TextField
} from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaExclamationTriangle } from "react-icons/fa";
import { z } from "zod";
import { Issue, Status } from "@prisma/client";
import SimpleMDE from "react-simplemde-editor";
import Link from "next/link";
import AssigneeSelect from "../[id]/AssigneeSelect";

type IssueFormData = z.infer<typeof issueSchema>;

const STATUS_TYPES = Object.values(Status);

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
        <Flex mb="4" justify="between" align="center">
          <Heading>{previousIssue ? "Edit Issue" : "New Issue"}</Heading>
          {previousIssue && <AssigneeSelect issue={previousIssue} />}
        </Flex>
        {submissionError && (
          <Callout.Root color="red" role="alert">
            <Callout.Icon>
              <FaExclamationTriangle />
            </Callout.Icon>
            <Callout.Text>{submissionError}</Callout.Text>
          </Callout.Root>
        )}
        <Flex gap="2">
          <TextField.Root className="w-full">
            <TextField.Input {...register("title")} placeholder="Title" />
          </TextField.Root>
          {previousIssue && (
            <Controller
              name="status"
              control={control}
              defaultValue="OPEN"
              render={({ field }) => (
                <Select.Root onValueChange={field.onChange} value={field.value}>
                  <Select.Trigger />
                  <Select.Content variant="soft">
                    {STATUS_TYPES.map((status) => (
                      <Select.Item key={status} value={status}>
                        {status.replace("_", " ")}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              )}
            />
          )}
        </Flex>
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
        <Flex gap="2">
          <Button type="submit" disabled={isSubmitting}>
            Submit
            {isSubmitting && <Spinner />}
          </Button>
          <Button type="button" color="red">
            <Link href="/issues">Cancel</Link>
          </Button>
        </Flex>
      </form>
    </div>
  );
};
export default IssueForm;
