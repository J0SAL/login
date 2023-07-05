"use client";
import Axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";

function VerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = React.useState<String>("loading");
  const [status, setStatus] = React.useState<String>("loading");
  React.useEffect(() => {
    setToken(searchParams.get("token")!.toString());
  }, [searchParams]);

  React.useEffect(() => {
    if (token !== "loading") {
      verifyToken(token);
    }
  }, [token]);

  const verifyToken = async (token: String) => {
    console.log("token: ", token);
    try {
      setStatus("loading");
      await Axios.post("/api/user/verifyemail", { token: token });
      toast.success("Email Verified Successfully");
      setStatus("success");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.response.data.message);
      setStatus(err.response.data.message);
    }
  };

  return (
    <div>
      <h1>token: {token}</h1>
      <h1>verified: {status}</h1>
    </div>
  );
}

export default VerifyEmail;
