"use client";

import { useState, useEffect } from "react";
import PromptCardList from "./prompt-card-list";

export default function PromptFeed() {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchPromptPosts = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/prompt`,
      );
      const postsData = await response.json();
      setPosts(postsData.data);
    };

    fetchPromptPosts();
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log(searchText);
    }
  };

  const handleTagClick = () => {
    console.log("tag clicked");
  };

  return (
    <section className="feed">
      <form className="flex-center relative w-full">
        <input
          type="text"
          placeholder="Search by tag or user..."
          className="search_input peer"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleSearch}
        />
      </form>
      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  );
}
