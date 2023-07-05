"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import GithubButton from "../components/buttons/GithubButton";

function SignupPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    username: "",
    password: "",
    email: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (
      user.username.length > 0 &&
      user.password.length > 0 &&
      user.email.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignup = async () => {
    console.log("signup");
    console.log(user);
    try {
      setLoading(true);
      const res = await Axios.post("/api/user/signup", user);
      toast.success("Signup Success");
      console.log(res.data);
      router.push("/login");
    } catch (err: any) {
      console.log("error ", err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
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
        <h1 className="text-2xl text-center">
          {loading ? "Processing" : "SignUp"}
        </h1>
        <label htmlFor="username">UserName</label>
        <input
          type="text"
          name="username"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
          className="form-control form-control-lg mb-3 w-100 px-3 py-2 rounded-3 border border-gray-400"
        />
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

        <button
          onClick={onSignup}
          className="rounded-full bg-blue-500 text-white p-1"
          disabled={buttonDisabled}
        >
          Signup
        </button>
        <Link href="/login" className="mt-2 text-center underline">
          login
        </Link>
        <GithubButton />
      </div>
    </div>
  );
}

export default SignupPage;
