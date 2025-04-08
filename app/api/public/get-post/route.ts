import { NextResponse } from "next/server";
import { JwtPayload } from "jsonwebtoken"; 
import { PrismaClient } from "@prisma/client";
import AuthMiddleWare from "@/lib/authmiddleware";


const prisma = new PrismaClient();

export async function GET(request: Request) {
    try {
        const decodedToken = await AuthMiddleWare();
        const userId = (decodedToken as JwtPayload).id;
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { response: "Missing or invalid post ID" },
                { status: 400 }
            );
        }

        const posts = await prisma.post.findMany({
            where: { id },
            orderBy: { createdAt: "desc" },
            include: {
                user: {
                    select: {
                        name: true,
                        username: true,
                    },
                },
                likes: {
                    select: {
                        userId: true,
                    },
                },
            },
        });

        const enrichedPosts = posts.map(({ likes, ...rest }) => ({
            ...rest,
            likeCount: likes.length,
            isLikedByCurrentUser: likes.some(like => like.userId === userId),
        }));

        return NextResponse.json(
            { response: "success", posts: enrichedPosts },
            { status: 200 }
        );

    } catch (error: any) {
        console.error("Error fetching posts:", error);
        return NextResponse.json(
            { response: error.message || "An unexpected error occurred" },
            { status: 500 }
        );
    }
}
