"use client";
import Heading from "@/components/Heading";
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FaLock } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "@/components/Input.css"
const Page = () => {
    const [form, setForm] = useState({ username: "", password: "" });
    const [stage, setStage] = useState<number>(1);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    useEffect(() => {
        if (stage === 2) {
            setTimeout(() => window.location.href = "/", 1000);
        }
    }, [stage]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const submitData = async (e: any) => {
        setIsSubmitting(true)
        e.preventDefault();
        let suffixurl;
        let body;
        if (stage === 1) {
            suffixurl = "login-stage-1";
            body = { ...form };
        }
        try {
            const response = await fetch(`/api/signup/${suffixurl}`, {
                method: "POST",
                body: JSON.stringify({ ...body }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.error) {
                toast.error(data.error);
            }
            if (data && data.stage) {
                setStage(data.stage);
            }
            setIsSubmitting(false)
        } catch (error) {
            console.error("Error submitting data:", error);
            setIsSubmitting(false)
            toast.error("Something went wrong. Please try again.");
        }finally{
            
        }
    };

    return (
        <div className='w-full flex justify-center '>

        <div className='pt-8 w-full border mt-6 mx-4 lg:w-1/3 md:w-1/3 rounded-2xl px-3 pb-6'>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} draggable pauseOnHover theme="dark" />
            <Heading >
                Login <FaLock className="pl-4" stroke="2px" />
            </Heading>
            <form onSubmit={submitData}>
                    <div className="flex flex-col  ">
                        <label className="pl-1 text-sm pt-3" htmlFor="username">Username</label>
                        <Input id="username" className=" focus:outline-0 w-full" value={form.username} onChange={handleChange} name="username" type="text" placeholder="Enter Username" required />
                        
                
                        <label className="pl-1 text-sm pt-3" htmlFor="password">Password</label>
                        <Input id="password" className=" focus:outline-0 w-full" value={form.password} onChange={handleChange} name="password" type="password" placeholder="Enter Password" required />
                  
                        <div className="flex items-end mt-3 w-full">
                            <Label className="pl-2 text-[12px] w-max text-left">Forgot Password?</Label>
                        </div>
                        <Button className="mt-5 p-5 font-bold" type="submit">{isSubmitting && <Loader2 className="animate-spin"/> }  Continue</Button>
                    </div>
            </form>
            <div className=" mt-4 themefont text-center text-[11px] font-medium ">
                <span className="text-black">by </span>Mustard.
            </div>
        </div>
        </div>
    );
};

export default Page;