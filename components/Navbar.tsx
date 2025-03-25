"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import basicDetails from "@/basicDetails";
import "./Navbar.css";
import Link from "next/link";
import { useMode } from "@/Context/Required";
import { LuSunDim } from "react-icons/lu";
import { PiMoonStarsDuotone } from "react-icons/pi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import MobileDrawer from "./MobileDrawer";
export default () => {
    const { mode, changeMode, token } = useMode();
    const [menu, setMenu] = useState<boolean>(true);
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    function closewin(){
        setMenu(false)
    }
    return (
        <div className="p-3  flex justify-between overflow-hidden">
            <div className="w-max themefont pl-2 text-[31px] font-medium ">
                Mustard.
            </div>
            <div className="w-max mt-1 text-md hidden lg:flex md:flex">
                {basicDetails.links.map((e) => (
                    <Link
                        key={e.link}
                        className="px-5 py-1 hover:translate-y-2 hover:text-lg transition-[500] hover:bg-zinc-50 rounded-sm"
                        href={e.link}
                        
                    >
                        {e.name}
                    </Link>
                ))}
            </div>

            <div className="w-max hidden lg:flex gap-2  md:flex relative">
                <Button className="hidden" onClick={() => changeMode()}>
                    {mode ? <PiMoonStarsDuotone /> : <LuSunDim />}
                </Button>
                {(token == null ? basicDetails.authButtons : basicDetails.unauthButtons).map((e) => (
                    <Link href={e.link} key={e.link}>
                        <Button>{e.name}</Button>
                    </Link>
                ))}
            </div>

            <Button
                className="absolute top-4 right-5 z-40 text-2xl scale-125 lg:hidden md:hidden rounded-full py-5 "
                onClick={() => setMenu(!menu)}
            >
                {menu ? <HiOutlineMenuAlt3 className="scale-125" /> : <IoClose className="scale-125" />}
            </Button>

            <div
                className={`fixed inset-0 bg-zinc-100 z-30 lg:hidden md:hidden slide ${menu ? "showslide" : ""
                    }`}
            >
                <MobileDrawer  closewin={closewin}  links={basicDetails.links} token={token} authButtons={basicDetails.authButtons} unauthButtons={basicDetails.unauthButtons} />
            </div>

        </div>
    );
};
