import { NextResponse } from "next/server";
import { tokenDecoder, tokenVerifier } from "@/components/tokenmethods";
import { PrismaClient } from '@prisma/client';
import AuthMiddleWare from "@/lib/authmiddleware";
const prisma = new PrismaClient();
export async function GET(request: Request) {
    try {
        const token = await AuthMiddleWare()
        if(typeof token !== "string") throw new Error("Token Error")
        const decodedToken = tokenDecoder(token);
        if (!decodedToken || typeof decodedToken !== "object" || !("id" in decodedToken)) {
            return NextResponse.json({ response: "Invalid token data" }, { status: 403 });
        }
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const pageSize = 10;
        if (page < 1) {
            return NextResponse.json({ response: "Invalid page number" }, { status: 400 });
        }
        const friends = await prisma.friend.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
           
        
        });
        return NextResponse.json({ response: "success", friends }, { status: 200 });
    } catch (error:any) {
        console.error("Error fetching:", error);
        return NextResponse.json({ response: error.message }, { status: 500 });
    }
}
