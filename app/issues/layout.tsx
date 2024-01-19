import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { PropsWithChildren } from "react";

const LayoutIssuePage = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Button>
        <Link href="/issues/new">New issue</Link>
      </Button>
      {children}
    </>
  );
};
export default LayoutIssuePage;
