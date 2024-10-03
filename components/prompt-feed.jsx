"use client";

import { useState, useEffect } from "react";
import PromptCardList from "./prompt-card-list";

export default function PromptFeed() {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchPromptPosts = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/prompt`,
      );
      const postsData = await response.json();
      setPosts(postsData.data);
      setSearchResults(postsData.data);
    };

    fetchPromptPosts();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    filterPosts(value);
  };

  const filterPosts = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setSearchResults(posts);
      return;
    }

    const filteredPosts = posts.filter(
      (item) =>
        item.tags.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.creator.username.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setSearchResults(filteredPosts);
  };

  const handleTagClick = (tags) => {
    setSearchText(tags);
    filterPosts(tags);
  };

  return (
    <section className="feed">
      <form className="flex-center relative w-full">
        <input
          type="text"
          placeholder="Search by tag, user or prompt..."
          className="search_input peer"
          value={searchText}
          onChange={handleSearch}
        />
      </form>
      <PromptCardList data={searchResults} handleTagClick={handleTagClick} />
    </section>
  );
}
