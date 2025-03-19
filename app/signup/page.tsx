import React from 'react'
import Heading from '@/components/Heading'
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { FaUnlock } from "react-icons/fa6";
import { Label } from "@/components/ui/label"

const Page = () => {
    return (
        <div className='w-full flex justify-center '>

        <div className='pt-8 border m-6 lg:w-1/3 md:w-1/3 rounded-2xl px-3'>
            <Heading>Sign Up <FaUnlock/></Heading>
            <Label htmlFor='abc'/>
            <Input id='abc'/>
            <Label htmlFor='def'/>
            <Input id='def'/>

            <Button>Login</Button>
        </div>
        </div>
    )
}
export default Page
