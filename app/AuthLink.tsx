"use client";
import { Spinner } from "@/components";
import { Avatar, DropdownMenu, Text } from "@radix-ui/themes";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

const AuthLink = () => {
  const { data: session, status } = useSession();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const isLoading = status === "loading" || isSigningIn;

  const handleSignIn = () => {
    if (status === "unauthenticated") {
      setIsSigningIn(true);
      signIn("google");
    }
  };

  if (isLoading) return <Spinner />;

  switch (status) {
    case "authenticated":
      return (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session.user!.image!}
              fallback="?"
              size="2"
              radius="full"
              className="cursor-pointer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="2">{session.user!.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item onSelect={() => signOut()}>
              Sign out
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      );
    case "unauthenticated":
      return <button onClick={handleSignIn}>Sign in</button>;
  }
};

export default AuthLink;
