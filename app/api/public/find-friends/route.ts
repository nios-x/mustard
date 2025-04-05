import { NextResponse } from "next/server"; 
import AuthMiddleWare from "@/lib/authmiddleware";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    try {
        const decodedToken = await AuthMiddleWare();

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const pageSize = 10;

        if (page < 1) {
            return NextResponse.json({ response: "Invalid page number" }, { status: 400 });
        }

        
        const userFriends = await prisma.friend.findMany({
            where: {
                OR: [
                    { user1: decodedToken.id },
                    { user2: decodedToken.id }
                ],
            },
            include: {
                userR1: { select: { id: true } }, 
                userR2: { select: { id: true } }  
            },
        });

        
        const friendIds = userFriends.map(friend => 
            friend.userR1.id === decodedToken.id ? friend.userR2.id : friend.userR1.id
        );

        const users = await prisma.user.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            where: {
                AND: [
                    { id: { not: decodedToken.id } },  
                    { id: { notIn: friendIds } }  
                ]
            },
            select: {
                id: true,
                name: true,
                username: true,
                createdAt: true
            }
        });

        return NextResponse.json({ response: "success", users }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching:", error);
        return NextResponse.json({ response: error.message }, { status: 500 });
    }
}
