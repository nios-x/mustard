import { NextResponse } from "next/server";
import { JwtPayload } from "jsonwebtoken"; 
import { PrismaClient } from "@prisma/client";
import AuthMiddleWare from "@/lib/authmiddleware";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    try {
        let decodedToken;
        try {
            decodedToken = await AuthMiddleWare();
        } catch (e:any) {
            return NextResponse.json({ response: e.message }, { status: 400 });
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

export async function POST(request: Request) {
    try {
        const requestData = await request.json();
        if (!requestData.content || requestData.content.trim() === "") {
            return NextResponse.json({ response: "Post content cannot be empty" }, { status: 400 });
        }

        let decodedToken;
        try {
            decodedToken = await AuthMiddleWare();
        } catch (e:any) {
            return NextResponse.json({ response: e.message }, { status: 400 });
        }

        const userId = (decodedToken as JwtPayload).id;

        const postcreated = await prisma.post.create({
            data: {
                userId,
                content: requestData.content.trim(),
            },
            include: {
                user: {
                    select: {
                        name: true,
                        username: true,
                    },
                },
            },
        });

        return NextResponse.json({ response: "Post created successfully!", postcreated }, { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json({ response: "An unexpected error occurred" }, { status: 500 });
    }
}
