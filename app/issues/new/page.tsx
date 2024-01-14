"use client";
import { Button, Heading, TextArea, TextField } from "@radix-ui/themes";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3 mx-auto">
      <Heading>Submit a new issue</Heading>
      <TextField.Root>
        <TextField.Input placeholder="Title" />
      </TextField.Root>
      <TextArea placeholder="Description" /> <Button>Submit issue</Button>
    </div>
  );
};
export default NewIssuePage;
