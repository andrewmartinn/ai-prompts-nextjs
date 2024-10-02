import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import PromptForm from "@/components/prompt-form";

export default async function CreatePrompt() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  return (
    <section className="w-full">
      <h2 className="blue_gradient text-4xl font-extrabold">Create Prompt</h2>
      <PromptForm userId={userId} type="Create" />
    </section>
  );
}
