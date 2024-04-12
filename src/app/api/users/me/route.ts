import { connect } from "@/dbConfig/dbConfig";
import { getSelfDataByToken } from "@/helpers/getSelfDataByToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  const userId = await getSelfDataByToken(request);
  const user = await User.findOne({ _id: userId }).select("-password");

  return NextResponse.json(
    { message: "User found", data: user },
    { status: 200 }
  );
}
