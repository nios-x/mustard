import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { tokenDecoder, tokenVerifier } from "@/components/tokenmethods";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function GET(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) {
            return NextResponse.json({ response: "Kindly Login or Sign Up to View Posts" }, { status: 401 });
        }
        if (!tokenVerifier(token)) {
            return NextResponse.json({ response: "Invalid or expired token" }, { status: 403 });
        }
        
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
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: "desc" },
            skip: (page - 1) * pageSize,
            take: pageSize,
            include: {
                user: {
                    select: {
                        name: true, 
                        username: true, 
                    },
                },
            },
        
        });
        return NextResponse.json({ response: "success", posts }, { status: 200 });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ response: "An unexpected error occurred" }, { status: 500 });
    }
}
