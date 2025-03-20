import { NextResponse } from "next/server";

export async function POST(request, { params }:{params:Promise<{stage:string}>}) { 
  const { stage } = await params;
  console.log(stage);
  return NextResponse.json({})
}
