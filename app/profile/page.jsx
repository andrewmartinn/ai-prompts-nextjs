"use client";

import { useEffect, useState } from "react";

import ProfileSummary from "@/components/profile-summary";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function MyProfile() {
  const router = useRouter();
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

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt");

    if (hasConfirmed) {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/prompt/${post._id.toString()}`,
          {
            method: "DELETE",
          },
        );

        const filteredPosts = userPosts.filter((item) => item._id !== post._id);
        setUserPosts(filteredPosts);
      } catch (error) {
        console.log("Error deleting the post:", error);
      }
    }
  };

  return (
    <ProfileSummary
      name={
        session?.user.name.charAt(0).toUpperCase() + session?.user.name.slice(1)
      }
      desc="Welcome to your personalized profile page. View, Edit and Delete prompts"
      data={userPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}
