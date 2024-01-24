"use client";
import { Spinner } from "@/components";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

const AuthLink = () => {
  const { status } = useSession();
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
        <button
          onClick={() => {
            signOut();
          }}
        >
          Sign out
        </button>
      );
    case "unauthenticated":
      return <button onClick={handleSignIn}>Sign in</button>;
  }
};

export default AuthLink;
