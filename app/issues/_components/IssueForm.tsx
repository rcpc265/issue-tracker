"use client";
import { createIssueSchema } from "@/app/validationSchemas";
import { ErrorMessage, Spinner } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Callout, Heading, TextField } from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaExclamationTriangle } from "react-icons/fa";
import { z } from "zod";
import MDESkeleton from "./MDESkeleton";
import { Issue } from "@prisma/client";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  loading: () => <MDESkeleton />,
  ssr: false,
});

type IssueFormData = z.infer<typeof createIssueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError: setFormError,
  } = useForm<IssueFormData>({
    defaultValues: { ...issue },
    resolver: zodResolver(createIssueSchema),
    mode: "onTouched",
  });
  const [error, setError] = useState("");

  const onSubmit = async (data: IssueFormData) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.status === 409) {
          setFormError("title", {
            type: "manual",
            message: "An issue with this title already exists.",
          });
        } else {
          setError("An unexpected error occurred.");
        }
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <Heading>New Issue</Heading>
        {error && (
          <Callout.Root color="red" role="alert">
            <Callout.Icon>
              <FaExclamationTriangle />
            </Callout.Icon>
            <Callout.Text>{error}</Callout.Text>
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

        <Button disabled={isSubmitting}>
          Submit
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};
export default IssueForm;
