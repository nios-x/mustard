import Link from "next/link"
export default function(props:any){
    return<div className="h-full px-7">
        <h1 className="mt-18 text-5xl text-zinc-600 ">
            Settings
        </h1>
        <div className="w-full mt-16 text-md text-zinc-800">
                {props.links.map((e:any) => (
                    <div className="px-3 py-[5.5] my-1 w-full text-3xl active:translate-x-2  transition-[250] active:bg-zinc-50 rounded-sm" key={e.link}>
                    <Link
                        
                        href={e.link}
                        >
                        {e.name}
                    </Link>
                    </div>
                ))}
            </div>
            <div className="py-3">

            </div>
            {(props.token == null ? props.authButtons : props.unauthButtons).map((e:any) => (
                    <div className="px-3 py-[5.5] my-1 w-full text-3xl active:translate-x-2  transition-[250] active:bg-zinc-50 rounded-sm" key={e.link}>
                    <Link
                        
                        href={e.link}
                        >
                        {e.name}
                    </Link>
                    </div>
                ))}
    </div> 
}