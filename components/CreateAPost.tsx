import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "./ui/button"
import { FiPlusCircle } from "react-icons/fi";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"

export default function CreateAPost() {
    return (
        <div className="flex justify-center">

            <div className="w-max"><Drawer>
                <DrawerTrigger>
                    <div className="w-max flex items-center gap-2 text-md text-white themefontrev py-3 mt-5 px-4 rounded-full"><BsFillPlusCircleFill className="text-2xl" /> Create a Post or Write Somthing</div>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle className="text-3xl">Create a Post</DrawerTitle>
                        <DrawerDescription><div></div>Posts are visible to public
                            <div className="grid w-full gap-2">
                                <Textarea placeholder="Type your message here." />
                                <Button>Send message</Button>
                            </div>

                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose>
                            <Button variant="outline" className="w-full">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer></div>
        </div>
    )
}
