"use client";

import { useEffect, useState } from "react";

import ProfileSummary from "@/components/profile-summary";
import { useSearchParams } from "next/navigation";

export default function UserProfile({ params }) {
  const [userPosts, setUserPosts] = useState([]);
  const searchParams = useSearchParams();
  const username = searchParams.get("name");

  console.log(params, "search params");

  useEffect(() => {
    const fetchUserPrompts = async () => {
      if (params?.id) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${params.id}/posts`,
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

    fetchUserPrompts();
  }, [params.id]);

  return (
    <ProfileSummary
      name={username.charAt(0).toUpperCase() + username.slice(1)}
      desc={`Explore ${username}'s profile check out thier latest posts and inspirations.`}
      data={userPosts}
    />
  );
}
