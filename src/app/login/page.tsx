"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { axios } from "axios";
import React from "react";

function LoginPage() {
  const [user, setUser] = React.useState({
    password: "",
    email: "",
  });

  const onLogin = async () => {
    console.log(user);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          border: "1px solid black",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1 className="text-2xl text-center">login</h1>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
          className="form-control form-control-lg mb-3 w-100 px-3 py-2 rounded-3 border border-gray-400"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
          className="form-control form-control-lg mb-3 w-100 px-3 py-2 rounded-3 border border-gray-400"
        />

        <button onClick={onLogin} className="border">
          Login
        </button>
        <Link href="/signup" className="mt-2 text-center underline">
          signup
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
