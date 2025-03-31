import bcrypt from 'bcrypt';
import mailer from '@/components/mailer';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function otpGenerator(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function generateToken(payload: object): string {
  const secret = process.env.JWT_SECRET || 'your_secret_key';
  return jwt.sign(payload, secret, { expiresIn: '90d' });
}

export async function POST(request: any, { params }: { params: Promise<any> }) {
  const { stage } = await params;
  const b = await request.json();

  if (stage === 'stage-1') return handleSignUpRequest(b);
  if (stage === 'stage-2') return handlePassword(b);
  if (stage === 'stage-3') return getSignUpData3(b);
  if (stage === 'login-stage-1') return loginUser(b);
  
  return NextResponse.json({ response: 'error', error: 'Invalid stage' });
}

async function loginUser(b:any){
  if(!b.username) return NextResponse.json({response:"error", error:"Username not Provided"})
    const user = await prisma.user.findFirst({where:{
  username:b.username
}})
if(!user) return  NextResponse.json({response:"error", error:"User not Found"})
  const isCorrect = await bcrypt.compare(b.password.trim(), user.password.trim());

  if(isCorrect){
    const token  = generateToken({id:user.id})
    const response = NextResponse.json({ response: 'success', stage: 2,  });
    response.cookies.set( "token", token,{
      httpOnly:false,
      secure:false,
      maxAge: 60 * 60 * 24 * 90,
    })
    return response
  }else{
    return NextResponse.json({ response: 'error', error: 'Invalid Password' });
  }


}


async function handleSignUpRequest(b: any) {
  try {
    // await prisma.user.deleteMany({ where: { OR: [{ email: b.email }, { username: b.username }] } });
    await prisma.tempUser.deleteMany({ where: { OR: [{ email: b.email }, { username: b.username }] } });
    const existingUserByUsername = await prisma.user.findFirst({ where: { username: b.username } });
    const existingUserByEmail = await prisma.user.findFirst({ where: { email: b.email } });

    if (existingUserByUsername) return NextResponse.json({ response: 'error', error: 'User exists with the same username' });
    if (existingUserByEmail) return NextResponse.json({ response: 'error', error: 'User exists with the same email' });

    const user = await prisma.tempUser.create({ data: { name: b.name, username: b.username, email: b.email, phone: b.phone } });
    return NextResponse.json({ response: 'success', received: b, stage: 2, userid: user.id });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ response: 'error', error: 'Error occurred', event: error.message });
  }
}

async function handlePassword(b: any) {
  console.log(b)
  if (!b.password || !b.userid || !b.rpassword) return NextResponse.json({ response: 'error', error: 'Missing fields' });
  if (b.password !== b.rpassword) return NextResponse.json({ response: 'error', error: 'Passwords do not match' });

  try {
    const hashedPassword = await bcrypt.hash(b.password, 10);
    const otp = otpGenerator();
    const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
    const busersemail = await prisma.tempUser.findFirst({where:{
      id:b.userid
    }})
    if (!busersemail ) return NextResponse.json({ response: 'error', error: 'Some error in Here' });

    await prisma.tempUser.update({ where: { id: b.userid }, data: { password: hashedPassword, OTP: otp, OTPExpiration: otpExpiration } });

    // Send OTP via mail  
    await mailer(busersemail.email as string, otp);
    console.log('OTP sent to:', b.email, 'OTP:', otp);

    return NextResponse.json({ response: 'success', stage: 3, userid: b.userid });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ response: 'error', error: 'Error occurred', event: error.message });
  }
}

async function getSignUpData3(b: any) {
  try {
    const user = await prisma.tempUser.findFirst({ where: { id: b.userid } });
    if (!user) return NextResponse.json({ response: 'error', error: 'User not found' });
    if (user.OTP !== b.otp) return NextResponse.json({ response: 'error', error: 'Invalid OTP' });
    if (user.OTPExpiration && new Date() > user.OTPExpiration) return NextResponse.json({ response: 'error', error: 'OTP expired', stage: 1 });

    const createdUser = await prisma.user.create({ data: { username: user.username, email: user.email, password: user.password as string, name: user.name, phone: user.phone } });
    await prisma.tempUser.delete({ where: { id: b.userid } });

    const token = generateToken({ id: createdUser.username });

    const response = NextResponse.json({ response: 'success', received: b, stage: 4,  });
    response.cookies.set( "token", token,{
      httpOnly:false,
      secure:false,
      maxAge: 60 * 60 * 24 * 90,
    })
    return response
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ response: 'error', error: 'Error occurred', event: error.message });
  }
}
