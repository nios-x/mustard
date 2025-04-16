import { NextResponse } from "next/server";
import { JwtPayload } from "jsonwebtoken"; 
import { PrismaClient } from "@prisma/client";
import AuthMiddleWare from "@/lib/authmiddleware";

const prisma = new PrismaClient();
export async function POST(request: Request){
    const decodedToken = await AuthMiddleWare();
    const data = await request.json();
    if(!decodedToken.id){throw new Error("Token error")}
    try{
        const comment = await prisma.comment.create({data:{
            postId:data.id,
            userId:decodedToken.id,
            description:data.comment
        }})
        console.log(comment)
        return NextResponse.json({comment, response:"success"})
    }catch(e:any){
        return NextResponse.json({response:"error", error:e.message},{status:400})
    }
}
export async function GET(request: Request) {
    try {
        const decodedToken = await AuthMiddleWare();
        const userId = (decodedToken as JwtPayload).id;
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const pageSize = 10;

        if (isNaN(page) || page < 1) {
            return NextResponse.json({ response: "Invalid page number" }, { status: 400 });
        }

        const posts = await prisma.comment.findMany({
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

        return NextResponse.json({ response: "success", posts: posts }, { status: 200 });

    } catch (error: any) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({status:"BAD", response: error.message || "An unexpected error occurred" }, { status: 500 });
    }
}