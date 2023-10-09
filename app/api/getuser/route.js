import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request) {
    const  id  = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    const topic = await User.findOne({ _id: id });
    return NextResponse.json({ topic }, { status: 200 });
  }