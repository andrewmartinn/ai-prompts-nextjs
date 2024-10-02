import PromptFeed from "@/components/prompt-feed";

export default function Home() {
  return (
    <section className="flex-center w-full flex-col">
      <h1 className="head_text text-center">
        Explore Ideas
        <br />
        <span className="orange_gradient text-center">AI-Enhanced Prompts</span>
      </h1>
      <p className="desc text-center">
        Join a community of creators sharing innovative AI prompts across
        diverse topics. Discover, create, and inspire one prompt at a time.
      </p>
      <PromptFeed />
    </section>
  );
}
