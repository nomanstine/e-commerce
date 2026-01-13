import { NextResponse } from "next/server";
import api from "@/lib/client";

export async function GET() {
  try {
    const response = await api.get('/api/');
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ message: "Hello World" });
  }
}
