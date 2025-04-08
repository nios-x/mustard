"use client"
import { useRef } from "react";
export const likeDebounceRef = useRef<{ [key: string]: NodeJS.Timeout }>({});