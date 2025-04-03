import { NextResponse } from "next/server";
import AuthMiddleWare from "@/lib/authmiddleware";
import prisma from "@/lib/prismaClient";
export async function POST(request:Request){
    const data = await request.json();
    console.log(data)
    try{
        if(!data.friendId)throw new Error("Friend's Id not Passed")
        const decodedToken = await AuthMiddleWare();
        const friendadd = await prisma.friend.deleteMany({
            where:{
                OR:[{
                    user1:decodedToken.id,
                    user2: data.friendId
                },{
                    user1: data.friendId,
                    user2:decodedToken.id
                }]
            }
        })
        console.log(friendadd, typeof friendadd)
        return NextResponse.json({removed: friendadd})
    }catch(e:any){
        return NextResponse.json({response : e.message})
    }

}