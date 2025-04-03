import { NextResponse } from "next/server";
import AuthMiddleWare from "@/lib/authmiddleware";
import prisma from "@/lib/prismaClient";

export async function GET(request: Request) {
    try {
        const decodedToken = await AuthMiddleWare();

        const friendRequests = await prisma.friend.findMany({
            where: {
                user2: decodedToken.id,
                isAccepted: false,
            },
            include: {
                userR1: {   
                    select: { id: true, name: true, username: true },
                },
            },
        });

        return NextResponse.json({ friendRequests });
    } catch (e: any) {
        return NextResponse.json({ response: e.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        if (!data.friendId) throw new Error("Friend's ID not provided");

        const decodedToken = await AuthMiddleWare();
        const user = await prisma.friend.updateMany({
            where: {
                user1: data.friendId,
                user2: decodedToken.id,
                isAccepted: false, // Ensure request exists before updating
            },
            data: { isAccepted: true },
        });
        console.log(user)

        return NextResponse.json({ response: "Success" });
    } catch (e: any) {
        return NextResponse.json({ response: e.message }, { status: 400 });
    }
}
