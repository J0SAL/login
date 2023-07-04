"use client";

import Axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import React from "react";
import Link from "next/link";

type UserProps = {
  _id: string;
  username: string;
  email: string;
};

function Profile() {
  const router = useRouter();

  const [user, setUser] = React.useState<UserProps>({
    _id: "",
    username: "",
    email: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [profileLoading, setProfileLoading] = React.useState(true);

  React.useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await Axios.get("/api/user/profile");
      setUser(res.data.user);
      console.log(res);
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setProfileLoading(false);
    }
  };

  const onLogout = async () => {
    console.log("logout");
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
    }
  };

  const onProfile = async () => {
    router.push(
      `/profile/${user!._id}?username=${user!.username}&email=${user!.email}`
    );
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
      <button
        onClick={onProfile}
        className="rounded bg-blue-600 text-white py-1 px-2"
      >
        {profileLoading ? (
          "Loading"
        ) : (
          <Link href={`/profile/${user?._id}`}>{user!.username}</Link>
        )}
      </button>
    </div>
  );
}

export default Profile;
