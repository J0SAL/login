"use client";

import Axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import React from "react";

function Profile() {
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);

  const onLogout = async () => {
    try {
      setLoading(true);
      const res = await Axios.get("/api/user/logout");
      toast.success("Logout Success");
      console.log(res);
      router.push("/login");
    } catch (err: any) {
      toast.error(err.message);
      console.log(err.message);
    } finally {
      setLoading(false);
      console.log("logout");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl">Profile</h1>
      <hr />
      <p>Welcome to Profile Page</p>
      <button
        onClick={onLogout}
        className="rounded bg-red-500 text-white py-1 px-2"
      >
        {loading ? "Loading" : "Logout"}
      </button>
    </div>
  );
}

export default Profile;
