import { NextResponse } from "next/server";
import api from "@/lib/client";

export async function GET() {
  return NextResponse.json({ message: "Hello World" });
}
