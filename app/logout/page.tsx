"use client"
import React, { useEffect } from 'react'

export default function Page() {
    useEffect(() => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/";
    }, [])

    return (
        <div className='h-[60vh] flex justify-center flex-col items-center'>
            <h2 className=''>Logging out...</h2>
            <h2 className=''>Redirecting...</h2>
        </div>
    )
}
