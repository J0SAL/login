"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";

function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = React.useState<String>("loading");

  const [user, setUser] = React.useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (user.newPassword.length === 0 || user.confirmPassword.length === 0) {
      setButtonDisabled(true);
    } else if (user.newPassword !== user.confirmPassword) {
      setButtonDisabled(true);
    } else if (token === "loading") {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [user]);

  React.useEffect(() => {
    setToken(searchParams.get("token")!.toString());
  }, [searchParams]);

  const resetPassword = async () => {
    console.log("reset password");
    console.log(user);
    console.log(token);
    try {
      setLoading(true);
      await Axios.post("/api/user/resetpassword", {
        token: token,
        password: user.newPassword,
      });
      toast.success("Password Changed Successfully");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.response.data.message ?? "Something went wrong");
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
        {token}
        <h1 className="text-2xl text-center">
          {loading ? "Loading" : "Reset Password"}
        </h1>
        <label htmlFor="email">New Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setUser({ ...user, newPassword: e.target.value })}
          placeholder="new password"
          className="form-control form-control-lg mb-3 w-100 px-3 py-2 rounded-3 border border-gray-400"
        />
        <label htmlFor="email">Confirm New Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) =>
            setUser({ ...user, confirmPassword: e.target.value })
          }
          placeholder="confirm password"
          className="form-control form-control-lg mb-3 w-100 px-3 py-2 rounded-3 border border-gray-400"
        />

        <button
          onClick={resetPassword}
          className="rounded-full bg-blue-500 text-white p-1 hover:bg-blue-600"
          disabled={buttonDisabled}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
