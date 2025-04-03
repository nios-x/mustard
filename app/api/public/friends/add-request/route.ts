import { NextResponse } from "next/server";
import AuthMiddleWare from "@/lib/authmiddleware";
import prisma from "@/lib/prismaClient";
export async function POST(request:Request){
    const data = await request.json();
    console.log(data)
    try{
        if(!data.friendId)throw new Error("Friend's Id not Passed")
        const decodedToken = await AuthMiddleWare();
        const friendadd = await prisma.friend.create({
            data:{
                user1:decodedToken.id,
                user2: data.friendId
            }
        })
        console.log(friendadd)
        return NextResponse.json({added: friendadd})
    }catch(e:any){
        console.log(e)
        return NextResponse.json({response : e.message})
    }

}