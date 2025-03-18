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

export default () => {
    const { mode, changeMode, token } = useMode();
    const [menu, setMenu] = useState<boolean>(true);
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="p-3 flex justify-between overflow-hidden">
            <div className="w-max themefont text-3xl">
                Mustard
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

            <div className="w-max hidden lg:flex gap-2 md:flex relative">
                <Button onClick={() => changeMode()}>
                    {mode ? <PiMoonStarsDuotone /> : <LuSunDim />}
                </Button>
                {(token == null ? basicDetails.authButtons : basicDetails.unauthButtons).map((e) => (
                    <Link href={e.link} key={e.link}>
                        <Button>{e.name}</Button>
                    </Link>
                ))}
            </div>

            <Button
                className="absolute top-2 right-2 z-40 lg:hidden md:hidden rounded-full p-2 text-xl"
                onClick={() => setMenu(!menu)}
            >
                {menu ? <HiOutlineMenuAlt3 /> : <IoClose />}
            </Button>

            <div
                className={`w-screen h-screen bg-zinc-100 absolute lg:hidden md:hidden top-0 left-0 slide ${
                    menu ? "showslide" : ""
                }`}
            ></div>
        </div>
    );
};
