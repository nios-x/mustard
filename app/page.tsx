"use client"
import React from "react";
import { Skeleton } from "@/components/ui/skeleton"
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import CreateAPost from "@/components/CreateAPost"

gsap.registerPlugin(useGSAP);
export default function Home() {
  useGSAP(() => {
    const tl =  gsap.timeline({ repeat: -1,})
    tl.from('.box', { x: "-100vw", stagger:0.2, duration:0.5 }); 
    tl.to(".box", {opacity:0,stagger:0.2, duration:0.5  })
});
  return (
    <div>
      <CreateAPost/>
      <div className="flex flex-col space-y-3 justify-center items-center mt-8">
      <Skeleton className="box h-[180px] w-[85vw] rounded-xl" />
      <div className="space-y-2 ">
        <Skeleton className="box h-5 w-[85vw]" />
        <Skeleton className="box h-5 w-[70vw]" />
      </div>
      
    </div>
    <div className="flex flex-col space-y-3 justify-center items-center mt-6">
      <Skeleton className="box h-[180px] w-[85vw] rounded-xl" />
      <div className="space-y-2 ">
        <Skeleton className="box h-5 w-[85vw]" />
        <Skeleton className="box h-5 w-[70vw]" />
      </div>
      
    </div>
    </div>
  );
}
