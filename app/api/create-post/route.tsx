import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request:Request) {
    
    const data = await request.json()
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if(!token)return NextResponse.json({
        response: "Kindly Login or Sign Up to Create Posts"
    })  
      
    console.log(jwt.decode(token))
    try{
        
    }catch(e){

    }


    return NextResponse.json({
        response: "Created Post Successfully !!"
    })    
}