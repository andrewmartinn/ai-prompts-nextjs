import { connectToDB } from "@/lib/database";
import Prompt from "@/lib/database/models/prompt.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");

    if (!prompts) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch prompts",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Prompts successfully fetched",
        data: JSON.parse(JSON.stringify(prompts)),
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
