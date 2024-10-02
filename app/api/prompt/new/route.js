import { connectToDB } from "@/lib/database";
import Prompt from "@/lib/database/models/prompt.model";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { userId, prompt, tags } = await req.json();

    if (!userId || !prompt || !tags) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID and prompt details are required.",
        },
        { status: 400 },
      );
    }

    await connectToDB();

    const newPrompt = await Prompt.create({
      creator: userId,
      prompt,
      tags,
    });

    if (!newPrompt) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create prompt",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "New prompt created",
        data: JSON.parse(JSON.stringify(newPrompt)),
      },
      { status: 201 },
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
