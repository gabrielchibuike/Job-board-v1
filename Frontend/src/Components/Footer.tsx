import { MdOutlineMailOutline } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaSnapchatGhost } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { useEffect } from "react";


function Footer() {
 
    return (
        <>
            <div className='w-full h-auto mt-16 py-10 bg-black'>
                <div className="w-full px-20 max-lg:px-0">
                    <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2">
                        <div className="space-y-5 p-5">
                            <div className="font-bold text-2xl text-blue-700 max-lg:text-xl">Konnect</div>
                            <div>
                                <h1 className="font-bold text-base text-blue-700">About Us</h1>
                                <p className="text-zinc-400 text-sm font-medium pt-2">  Lorem ipsum dolor, sit amet consectetur laborum odit. Dolorum molestias dicta consequatur suscipit, aut quas placeat?</p>
                            </div>

                        </div>
                        <div className="space-y-1 p-5 max-lg:p-1 max-lg:py-5">
                            <div className="font-bold text-base text-blue-700 ">Information</div>
                            <div className="pt-1">
                                <div className="text-zinc-400 text-sm font-medium">About Us</div>
                                <div className="text-zinc-400 text-sm font-medium">More Search</div>
                                <div className="text-zinc-400 text-sm font-medium">Blog </div>
                                <div className="text-zinc-400 text-sm font-medium">Create C.v</div>
                            </div>
                        </div>
                        <div className="space-y-1 p-5">
                            <div className="text-base  font-bold text-blue-700">Helpful Links</div>
                            <div className="pt-1">
                                <div className="text-zinc-400 text-sm font-medium ">Support</div>
                                <div className="text-zinc-400 text-sm font-medium">Terms & Condition</div>
                                <div className="text-zinc-400 text-sm font-medium">Privacy policy </div>
                            </div>
                        </div>
                        <div className="space-y-2 p-5 max-lg:px-0 text-white max-lg:py-5">
                            <div>
                                <h1 className="font-bold text-base text-blue-700">Contact Us</h1>
                                <div className="text-zinc-400 text-sm font-medium pt-2 flex gap-2 items-center">
                                    <BsFillTelephoneFill className='text-blue-700' />
                                    <p> +234 814-139-3379</p>
                                </div>
                                <div className="text-zinc-400 text-sm font-medium flex gap-2 items-center">
                                    <MdOutlineMailOutline className='text-blue-700' />
                                    <p> Konnect@gmail.com</p>
                                </div>
                            </div>
                            <div className="text-base  font-bold text-blue-700">Follow Us</div>
                            <div className="flex gap-5 pt-1 max-lg:gap-2">
                                <div className="w-auto h-auto bg-blue-700 rounded-full p-2 cursor-pointer">
                                    <FaFacebookF />
                                </div>
                                <div className="w-auto h-auto bg-blue-700 rounded-full p-2 cursor-pointer">
                                    <AiOutlineTwitter />
                                </div>
                                <div className="w-auto h-auto bg-blue-700 rounded-full p-2 cursor-pointer">
                                    <AiOutlineInstagram />
                                </div>
                                <div className="w-auto h-auto bg-blue-700 rounded-full p-2 cursor-pointer">
                                    <FaSnapchatGhost />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer