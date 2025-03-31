import { useState, useEffect } from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function CreateAPost(props:any) {
    const [postText, setPostText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [disableTrigger, setDisableTrigger] = useState(false); // Prevent reopening after submission

    const submitPost = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/public/create-post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content: postText }),
            });

            const data = await response.json();
            if (data.response) toast(data.response);
            if(data.postcreated){
                props.setPosts([data.postcreated, ...props.posts])
            }
            setIsSubmitting(false);
            setIsDrawerOpen(false); // Close drawer after posting
            setDisableTrigger(false); // Prevent reopening
            setPostText(""); // Reset post input

        } catch (e: any) {
            toast(e.message);
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        toast("Welcome back to Mustard.");
    }, []);

 
    return (
        <div className="flex justify-center">
            <Toaster />
            <div className="w-max">
                <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                    <DrawerTrigger
                        onClick={() => {
                            if (!disableTrigger) setIsDrawerOpen(true);
                        }}
                        disabled={disableTrigger} // Prevent clicking after submission
                    >
                        <div className={`w-max flex items-center gap-2 hover:outline-2 outline-black text-md text-white themefontrev py-3 mt-5 px-4 rounded-full ${disableTrigger ? "opacity-50 cursor-not-allowed" : ""}`}>
                            <BsFillPlusCircleFill className="text-2xl" /> Create a Post or Write Something
                        </div>
                    </DrawerTrigger>
                    {!isSubmitting && isDrawerOpen && (
                        <DrawerContent className="min-h-[20vh] pb-2">
                            <DrawerHeader>
                                <DrawerTitle className="ml-2 text-zinc-600 text-3xl">Create a Post</DrawerTitle>
                                <div className="mt-1 px-2 text-sm">
                                    Posts are visible to public
                                    <div className="mt-2 h-[20vh] grid w-full gap-2">
                                        <Textarea
                                            value={postText}
                                            onChange={(e) => setPostText(e.target.value)}
                                            className="border-orange-200"
                                            placeholder="Create a Post or Write Something"
                                        />
                                    </div>
                                </div>
                            </DrawerHeader>
                            <DrawerFooter>
                                <AlertDialog>
                                    <AlertDialogTrigger className="bg-black text-white p-2 rounded-3xl">
                                        Post
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Confirm to Post</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you really sure you want to post?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={submitPost} className="rounded-full">
                                                Continue
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </DrawerFooter>
                        </DrawerContent>
                    )}
                </Drawer>
            </div>
        </div>
    );
}
