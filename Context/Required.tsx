"use client"
import { createContext, useContext, useState, ReactNode } from "react";

export const ModeContext = createContext<{ mode: boolean; changeMode: () => void , token:string|null}>({
    mode: false,
    changeMode: () => {},
    token:null,
});

export const useMode = () => {
    return useContext(ModeContext);
};

const ModeProvider = ({ children }:{children: ReactNode;}) => {
    const [mode, setMode] = useState(false);
    const [token, setToken] = useState<null|string>(null)
    const changeMode = () => {
        setMode((prevMode) => !prevMode);
    };

    return (
        <ModeContext.Provider value={{ mode, changeMode, token }}>
            {children}
        </ModeContext.Provider>
    );
};

export default ModeProvider;
