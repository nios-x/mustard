"use client"
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Lenis from 'lenis'
export const ModeContext = createContext<{ mode: boolean; changeMode: () => void, token: string | null }>({
    mode: false,
    changeMode: () => { },
    token: null,
});

export const useMode = () => {
    return useContext(ModeContext);
};

const ModeProvider = ({ children }: { children: ReactNode; }) => {
    const [mode, setMode] = useState(false);
    const [token, setToken] = useState<null | string>(null)
    const changeMode = () => {
        setMode((prevMode) => !prevMode);
    };
    useEffect(() => {
        const token = document.cookie.split("; ").find((e)=>(e.startsWith("token=")))?.split("=")[1];
        if(token){
            setToken(token)
        }
        const lenis = new Lenis();
        function raf(time: any) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }, [])
    return (
        <ModeContext.Provider value={{ mode, changeMode, token }}>
            {children}
        </ModeContext.Provider>
    );
};

export default ModeProvider;
