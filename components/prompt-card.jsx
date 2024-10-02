"use client";

import Image from "next/image";
import { useState } from "react";

export default function PromptCard({ post, handleTagClick }) {
  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex items-start justify-between gap-5">
        <div className="flex flex-1 cursor-pointer items-center justify-start gap-3">
          <Image
            src={post.creator.image}
            alt="user image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="text-sm text-gray-500">{post.creator.email}</p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt=""
            height={16}
            width={16}
          />
        </div>
      </div>
      <p className="my-4 flex-1 text-sm text-gray-700">{post.prompt}</p>
      <p
        className="blue_gradient cursor-pointer text-sm"
        onClick={() => handleTagClick && handleTagClick(post.tags)}
      >
        {post.tags}
      </p>
    </div>
  );
}
