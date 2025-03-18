import React from "react";
import { Button } from "./ui/button";
import basicDetails from "@/basicDetails";
import "./Navbar.css"
import Link from "next/link";
export default ()=>{
    return <div className="p-3 flex justify-between">
        <div className="w-max themefont text-3xl">
            Mustard
        </div>

        <div className="w-max mt-3 text-md  hidden lg:flex md:flex ">
            {basicDetails.links.map((e)=>{
                return <Link key={e.link} className="px-5 py-1 hover:translate-y-2 hover:text-lg transition-[500] hover:bg-zinc-50 rounded-sm" href={e.link}>
                    {e.name}
                </Link>
            })}
        </div>
        <div className="w-max hidden lg:flex gap-2 md:flex ">
            {basicDetails.authButtons.map((e)=>{
                return <Link href={e.link} key={e.link}>
                    <Button>
                    {e.name}

                    </Button>
                </Link>
            })}

        </div>

    </div>
}
