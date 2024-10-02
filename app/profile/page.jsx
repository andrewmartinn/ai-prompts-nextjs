"use client";

import { useEffect, useState } from "react";

import ProfileSummary from "@/components/profile-summary";
import { useSession } from "next-auth/react";

export default function Profile() {
  const [userPosts, setUserPosts] = useState([]);

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchUserPrompts = async () => {
      if (session?.user.id) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${session.user.id}/posts`,
          );

          if (!response.ok) {
            throw new Error(
              `Failed to fetch user posts: ${response.status} ${response.statusText}`,
            );
          }

          const data = await response.json();
          console.log("data from use effect", data);
          setUserPosts(data.data);
        } catch (error) {
          console.error("Failed to fetch users posts:", error);
        }
      }
    };

    if (status === "authenticated") {
      fetchUserPrompts();
    }
  }, [session, status]);

  const handleEdit = () => {
    console.log("edit prompt");
  };

  const handleDelete = () => {
    console.log("delete prompt");
  };

  return (
    <ProfileSummary
      name="Andrew"
      desc="Welcome to your personalized profile"
      data={userPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}
