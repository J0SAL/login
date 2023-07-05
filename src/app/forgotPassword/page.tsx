"use client";

import Axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";

function ForgotPassword() {
  const [user, setUser] = React.useState({
    email: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (user.email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSubmit = async () => {
    console.log("submit");
    console.log(user);
    try {
      setLoading(true);
      const res = await Axios.post("/api/user/forgotpassword", user);
      toast.success(res.data.message);
      console.log(res);
    } catch (err: any) {
      console.log("error ", err);
      toast.error(err.response.data.message);
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
          {loading ? "Loading" : "Fogot Password"}
        </h1>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
          className="form-control form-control-lg mb-3 w-100 px-3 py-2 rounded-3 border border-gray-400"
        />

        <button
          onClick={onSubmit}
          className="rounded-full bg-blue-500 text-white p-1 hover:bg-blue-600"
          disabled={buttonDisabled}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
