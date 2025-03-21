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
    const [form, setForm] = useState({ username: "", email: "", phone: "", name: "" });
    const [form2, setForm2] = useState({ password: "", rpassword: "" });
    const [form3, setForm3] = useState({ otp: "" });
    const [userid, setUserId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [stage, setStage] = useState<number>(1);
    const router = useRouter();

    useEffect(() => {
        if (stage === 4) {
            setTimeout(() => router.push("/login"), 1000);
        }
    }, [stage]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm2({ ...form2, [e.target.name]: e.target.value });
    };
    const handleChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm3({ ...form3, [e.target.name]: e.target.value });
    };
    const submitData = async (e: any) => {
        e.preventDefault();
        let suffixurl;
        let body;
        if (stage === 1) {
            suffixurl = "stage-1";
            body = { ...form };
        } else if (stage === 2) {
            suffixurl = "stage-2";
            body = { password: form2.password, rpassword: form2.rpassword };
        } else if (stage === 3) {
            suffixurl = "stage-3";
            body = { otp: form3.otp };
        }

        try {
            const response = await fetch(`/api/signup/${suffixurl}`, {
                method: "POST",
                body: JSON.stringify({ ...body, userid }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setForm2({password:"", rpassword:""})
            setForm3({otp:""})
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
            <Heading>
                Signup <FaLock className="pl-4" stroke="2px" />
            </Heading>
            <form onSubmit={submitData}>
                {stage === 1 && (
                    <div className="flex flex-col ">
                        <label className="pl-1 text-sm pt-2" htmlFor="username">Username</label>
                        <Input id="username" className=" focus:outline-0 w-full" value={form.username} onChange={handleChange} name="username" type="text" placeholder="Enter Username" required />
                        
                        <label className="pl-1 text-sm pt-2" htmlFor="name">Name</label>
                        <Input id="name" className=" focus:outline-0 w-full" value={form.name} onChange={handleChange} name="name" type="text" placeholder="Enter Name" required />
                        
                        <label className="pl-1 text-sm pt-2" htmlFor="email">Email</label>
                        <Input id="email" className=" focus:outline-0 w-full" value={form.email} onChange={handleChange} name="email" type="email" placeholder="Enter Email" required />
                        
                        <label className="pl-1 text-sm pt-2" htmlFor="phone">Phone</label>
                        <Input id="phone" className=" focus:outline-0 w-full" value={form.phone} onChange={handleChange} name="phone" type="number" placeholder="Enter Phone" required />
                        
                        <div className="flex items-center mt-3">
                            <Checkbox id="terms" required />
                            <Label className="pl-2 text-[12px]">Accept terms and conditions</Label>
                        </div>
                        
                        <Button className="mt-5 p-5 font-bold" type="submit">Continue</Button>
                    </div>
                )}
                {stage === 2 && (
                    <div className="flex flex-col mx-7">
                        <label className="pl-1 text-sm" htmlFor="password">Enter- Password</label>
                        <Input id="password" value={form2.password} onChange={handleChange2} name="password" type="password" placeholder="Enter Password" required />

                        <label className="pl-1 mt-2 text-sm" htmlFor="rpassword">Confirm Password</label>
                        <Input id="rpassword" value={form2.rpassword} onChange={handleChange2} name="rpassword" type="password" placeholder="Re-enter Password" required />

                        <Button disabled={isSubmitting} className="mt-5 p-5 font-bold" type="submit">Continue</Button>
                    </div>
                )}
                {stage === 3 && (
                    <div className="flex flex-col mx-7">
                        <label className="pl-1 text-sm" htmlFor="otp">Enter One Time Password</label>
                        <Input id="otp" value={form3.otp} onChange={handleChange3} name="otp" type="number" placeholder="Enter OTP" required />

                        <Button className="mt-5 p-5 font-bold" type="submit">Continue</Button>
                    </div>
                )}
            </form>
        </div>
        </div>
    );
};

export default Page;