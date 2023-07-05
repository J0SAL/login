"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

function GithubButton() {
  const { data } = useSession();
  console.log("data", data);
  const handleSignIn = () => {
    signIn("github");
  };
  return (
    <button
      onClick={handleSignIn}
      className="rounded-full bg-black text-white p-1"
    >
      Github
    </button>
  );
}

export default GithubButton;
