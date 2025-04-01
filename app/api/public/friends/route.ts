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

        const friends = await prisma.friend.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            where: {
                OR: [
                    { user1: decodedToken.id },
                    { user2: decodedToken.id }
                ],
                isAccepted: true,  
            },
            include: {
                userR1: { select: { id: true, name: true, username: true, createdAt: true } },  
                userR2: { select: { id: true, name: true, username: true, createdAt: true } }   
            }
        });

        // Transform data to return only the friend user details
        const friendList = friends.map(friend => {
            return friend.userR1.id === decodedToken.id ? friend.userR2 : friend.userR1;
        });

        return NextResponse.json({ response: "success", friends: friendList }, { status: 200 });

    } catch (error: any) {
        console.error("Error fetching friends:", error);
        return NextResponse.json({ response: error.message }, { status: 500 });
    }
}
