import { connectToDB } from "@/lib/database";
import Prompt from "@/lib/database/models/prompt.model";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// GET PROMPT
export async function GET(req, { params }) {
  try {
    await connectToDB();

    const postId = params.id;
    const post = await Prompt.findById(postId).populate("creator");

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to find prompt",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Successfully found prompt",
        data: JSON.parse(JSON.stringify(post)),
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}

// UPDATE PROMPT
export async function PATCH(req, { params }) {
  const postId = params.id;
  const { prompt, tags } = await req.json();
  try {
    await connectToDB();
    const exisitingPrompt = await Prompt.findById(postId);

    if (!exisitingPrompt) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to find prompt",
        },
        { status: 400 },
      );
    }

    exisitingPrompt.prompt = prompt;
    exisitingPrompt.tags = tags;

    await exisitingPrompt.save();

    revalidatePath("/");
    return NextResponse.json(
      {
        success: true,
        message: "Prompt successfully updated",
        data: JSON.parse(JSON.stringify(exisitingPrompt)),
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}

// DELETE PROMPT
export async function DELETE(req, { params }) {
  const postId = params.id;
  try {
    await connectToDB();

    const deletedPost = await Prompt.findByIdAndDelete(postId);

    if (!deletedPost) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to delete prompt",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Prompt deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
