import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import TrialRequest from "@/lib/models/TrialRequest";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    
    const { name, restaurantName, contactNumber, location, preferredTime } = body;
    
    if (!name || !restaurantName || !contactNumber || !location || !preferredTime) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    const trialRequest = await TrialRequest.create({
      name,
      restaurantName,
      contactNumber,
      location,
      preferredTime
    });
    
    return NextResponse.json(
      { message: "Trial request submitted successfully", id: trialRequest._id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("API Trial Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
