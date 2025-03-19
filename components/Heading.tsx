import React from "react"
export default function({children}:{children: React.ReactNode}){
    return <div className="flex justify-center text-4xl py-2 px-4 gap-2 lg:mt-6">
        {children}
    </div>
}