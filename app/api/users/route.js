import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
    await connectMongoDB()
    const users = await User.find()
    return NextResponse.json({users})
}

export async function PUT(request) {
    const id  = request.nextUrl.searchParams.get("id");
    const { newFunds: funds } = await request.json()
    await connectMongoDB()
    await User.findByIdAndUpdate(id , { funds })
    return NextResponse.json({message:"Funds updtaed"}, {status:200})
}