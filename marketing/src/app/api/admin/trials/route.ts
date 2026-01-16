import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import TrialRequest from "@/lib/models/TrialRequest";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const trials = await TrialRequest.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ trials }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
