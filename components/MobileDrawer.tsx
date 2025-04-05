"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
export default function(props:any){
    const router = useRouter()
    const handleClose = (e:string)=>{
        props.closewin()
        router.push(e)
    }
    return<div className="h-full px-7 ">
        <button onClick={props.closewin} className="mt-18 text-5xl text-zinc-600 ">
            Settings

        </button>
        <div className="w-full mt-16 text-md text-zinc-800">
                {props.links.map((e:any) => (
                    <div className="px-3 py-[5.5] my-1 w-full text-3xl active:translate-x-2  transition-[250] active:bg-zinc-50 rounded-sm" key={e.link}>
                    <button onClick={()=>{handleClose(e.link)}}>
                        {e.name}
                    </button>
                    </div>
                ))}
            </div>
            <div className="py-3">

            </div>
            {(props.token == null ? props.authButtons : props.unauthButtons).map((e:any) => (
                    <div className="px-3 py-[5.5] my-1 w-full text-3xl active:translate-x-2  transition-[250] active:bg-zinc-50 rounded-sm" key={e.link}>
                    <button onClick={()=>{handleClose(e.link)}}>
                        {e.name}
                    </button>
                    </div>
                ))}
    </div> 
}