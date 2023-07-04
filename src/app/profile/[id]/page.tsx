"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

function SubProfile({ params }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [user, setUser] = React.useState<any>({
    id: "",
    username: "",
    email: "",
  });

  React.useEffect(() => {
    setUser({
      id: params.id,
      username: searchParams.get("username"),
      email: searchParams.get("email"),
    });
  }, [pathname, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Sub Profile</h1>
      <hr />
      <p>Welcome to sub-profile Page: </p>
      <table>
        <tr>
          <td>id </td>
          <td>
            <span className="text-blue-600">{user.id}</span>{" "}
          </td>
        </tr>
        <tr>
          <td>username </td>
          <td>
            <span className="text-blue-600">{user.username}</span>{" "}
          </td>
        </tr>
        <tr>
          <td>email </td>
          <td>
            <span className="text-blue-600">{user.email}</span>{" "}
          </td>
        </tr>
      </table>

      <button
        onClick={() => router.back()}
        className="rounded bg-gray-500 text-white px-1"
      >
        Back
      </button>
    </div>
  );
}

export default SubProfile;
