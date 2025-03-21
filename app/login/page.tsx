"use client";
import Heading from "@/components/Heading";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FaLock } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "@/components/Input.css"
const Page = () => {
    const [form, setForm] = useState({ username: "", password: "" });
    const [userid, setUserId] = useState<string | null>(null);
    const [stage, setStage] = useState<number>(1);
    const router = useRouter();

    useEffect(() => {
        if (stage === 2) {
            setTimeout(() => router.push("/login"), 1000);
        }
    }, [stage]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const submitData = async (e: any) => {
        e.preventDefault();
        let suffixurl;
        let body;
        if (stage === 1) {
            suffixurl = "stage-1";
            body = { ...form };
        }

        try {
            const response = await fetch(`/api/signup/${suffixurl}`, {
                method: "POST",
                body: JSON.stringify({ ...body, userid }),
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
            if (data && data.userid) {
                setUserId(data.userid);
            }
            if (data && data.token) {
                localStorage.setItem("mustard-tkn",data.token)
            }
            if (data && data.stage) {
                setStage(data.stage);
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            toast.error("Something went wrong. Please try again.");
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
                        
                        <Button className="mt-5 p-5 font-bold" type="submit">Continue</Button>
                    </div>
            </form>
        </div>
        </div>
    );
};

export default Page;