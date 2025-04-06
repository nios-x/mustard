import AuthMiddleWare from "@/lib/authmiddleware";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

export async function POST(request: Request): Promise<any> {
    try {
        const decodedToken = await AuthMiddleWare(); 
        const { postid } = await request.json();
        const likeExists = await prisma.like.count({
            where: {
                postId: postid,
                userId: decodedToken.id,
            },
        });
        if (likeExists > 0) {
            await prisma.like.deleteMany({
                where: {
                    postId: postid,
                    userId: decodedToken.id,
                },
            });
            return NextResponse.json({ success: true, response: "removed" });
        } else {
            await prisma.like.create({
                data: {
                    postId: postid,
                    userId: decodedToken.id,
                },
            });
            return NextResponse.json({ success: true, response: "added" });
        }

    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}
