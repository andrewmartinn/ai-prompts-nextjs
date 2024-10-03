import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import PromptForm from "@/components/prompt-form";

export default async function UpdatePrompt({ searchParams }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const postId = searchParams.id;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/prompt/${postId}`,
  );
  const postData = await response.json();

  return (
    <section className="w-full">
      <h2 className="blue_gradient text-4xl font-extrabold">Update Prompt</h2>
      <PromptForm userId={userId} type="Update" promptData={postData.data} />
    </section>
  );
}
