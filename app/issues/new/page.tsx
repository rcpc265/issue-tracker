"use client";
import { createIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Heading, Text, TextField } from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaExclamationTriangle } from "react-icons/fa";
import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (data: IssueForm) => {
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
        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}
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
          <Text color="red" as="p" style={{ marginTop: "-24px" }}>
            {errors.description.message}
          </Text>
        )}
        <Button>Submit</Button>
      </form>
    </div>
  );
};
export default NewIssuePage;
