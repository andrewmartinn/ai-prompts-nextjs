import { connectToDB } from "@/lib/database";
import Prompt from "@/lib/database/models/prompt.model";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const userId = params.id;

    const userPrompts = await Prompt.find({ creator: userId }).populate(
      "creator",
    );

    if (!userPrompts) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch user prompts",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Successfully fetched user prompts",
        data: JSON.parse(JSON.stringify(userPrompts)),
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
