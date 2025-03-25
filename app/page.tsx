"use client"
import React from "react";
import { Skeleton } from "@/components/ui/skeleton"

import CreateAPost from "@/components/CreateAPost"
export default function Home() {
  return (
    <div>
      <CreateAPost/>
      <div className="flex flex-col space-y-3 justify-center items-center mt-8">
      <Skeleton className="h-[180px] w-[85vw] rounded-xl" />
      <div className="space-y-2 ">
        <Skeleton className="h-5 w-[85vw]" />
        <Skeleton className="h-5 w-[70vw]" />
      </div>
      
    </div>
    <div className="flex flex-col space-y-3 justify-center items-center mt-6">
      <Skeleton className="h-[180px] w-[85vw] rounded-xl" />
      <div className="space-y-2 ">
        <Skeleton className="h-5 w-[85vw]" />
        <Skeleton className="h-5 w-[70vw]" />
      </div>
      
    </div>
    </div>
  );
}
