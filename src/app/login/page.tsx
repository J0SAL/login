"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";

function LoginPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    password: "",
    email: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (user.password.length > 0 && user.email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    console.log("login");
    console.log(user);
    try {
      setLoading(true);
      const res = await Axios.post("/api/user/login", user);
      toast.success("Login Success");
      console.log(res.data);
      router.push("/profile");
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
          {loading ? "Loading" : "Login"}
        </h1>
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
          onClick={onLogin}
          className="rounded-full bg-blue-500 text-white p-1 hover:bg-blue-600"
          disabled={buttonDisabled}
        >
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
