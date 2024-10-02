"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function PromptForm({ userId, type }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      prompt: "",
      tags: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/prompt/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...values, userId: userId }),
        },
      );

      if (response.ok) {
        reset();
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-10 w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="glassmorphism flex w-full max-w-2xl flex-col gap-7"
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="prompt"
            className="text-base font-semibold text-gray-700"
          >
            Your AI Prompt
          </label>
          <textarea
            name="prompt"
            id="prompt"
            className="form_textarea resize-none"
            placeholder="Write your prompt here..."
            {...register("prompt", { required: "Prompt is required" })}
          />
          {errors.prompt && (
            <span className="text-[12px] text-red-500">
              {errors.prompt.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="tags"
            className="text-base font-semibold text-gray-700"
          >
            Prompt Tags
          </label>
          <input
            name="tags"
            id="tags"
            className="form_input"
            placeholder="#webdev, #cooking, #product, #idea"
            {...register("tags", { required: "Tag is required" })}
          />
          {errors.tags && (
            <span className="text-[12px] text-red-500">
              {errors.tags.message}
            </span>
          )}
        </div>
        <div className="mx-3 mb-5 flex flex-col gap-4 sm:flex-row sm:justify-end">
          <Link
            href="/"
            className="w-full rounded-lg border border-gray-300 px-6 py-1.5 text-center transition-all duration-300 hover:bg-zinc-800 hover:text-white sm:w-auto"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="w-full rounded-lg bg-primary-100 px-6 py-1.5 text-white sm:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div role="status" className="flex items-center gap-3">
                <svg
                  aria-hidden="true"
                  className="size-5 animate-spin fill-white text-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span>Submitting...</span>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
