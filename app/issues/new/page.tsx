"use client";
import { Button, Heading, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();

  return (
    <form
      className="max-w-xl space-y-3 mx-auto"
      onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post("/api/issues", data);
          router.push("/issues");
        } catch (error) {
          console.log("An error occurred while creating the issue.", error);
        }
      })}
    >
      <Heading>New Issue</Heading>
      <TextField.Root>
        <TextField.Input {...register("title")} placeholder="Title" />
      </TextField.Root>
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
      <Button>Submit</Button>
    </form>
  );
};
export default NewIssuePage;
