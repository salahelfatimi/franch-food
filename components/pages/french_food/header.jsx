"use client"
import { Bike, Drumstick } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Header(){
    const [showButtons, setShowButtons] = useState(false); 
    const dropdownRef = useRef(null); 

    const toggleButtons = () => {setShowButtons(!showButtons);}
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {setShowButtons(!showButtons); }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => { document.removeEventListener("mousedown", handleClickOutside);};
    }, []);
    return(
        <div>
            <div className=" relative  h-screen ">
                <div className=" bg-black opacity-60 absolute inset-0 "></div>
                <video alt="french food" title="french food" width="100%" height="100%" autoPlay loop playsInline muted className=" w-full h-full object-cover " >
                    <source src="/vid/header-franch-food.mp4" type="video/mp4" />
                </video>
                <div className=" z-20 flex p-4 flex-col gap-4 items-center justify-center container mx-auto absolute inset-0">
                    <h1 className=" text-center text-2xl lg:text-5xl font-bold font-primary uppercase text-white ">Le Meilleur du Poulet Frit à Marrakech !</h1>
                    <div className=" flex lg:flex-row flex-col items-center gap-4">
                        <Link href={'#'} className=" bg-primary text-white font-primary px-6 py-2 lg:text-lg text-sm rounded-full  font-semibold uppercase hover:bg-transparent border-2 border-primary hover:border-white hover:text-white duration-700 flex items-center justify-center gap-1"><Drumstick /> Je veux du fried chicken ! </Link>
                        <div className=" relative">
                            <button onClick={toggleButtons} className=" cursor-pointer bg-white text-primary font-primary px-6 py-2 lg:text-lg text-sm rounded-full font-semibold uppercase hover:bg-transparent hover:text-white border-2 border-white duration-700 flex items-center justify-center gap-1" > <Bike /> Commandez avec Glovo & Hayaku </button>
                            {showButtons && (
                                <div className="flex flex-col gap-2 items-center lg:items-start justify-center w-full lg:w-fit absolute pt-2" ref={dropdownRef}>
                                    <Link href={"#menu"} className="bg-primary text-white font-primary px-6 py-2 lg:text-base text-sm rounded-full font-semibold uppercase hover:bg-transparent border-2 border-primary hover:border-white hover:text-white duration-700" >Commandez avec Hayaku</Link>
                                    <Link href={"#contact"} className="bg-primary text-white font-primary px-6 py-2 lg:text-base text-sm rounded-full font-semibold uppercase hover:bg-transparent border-2 border-primary hover:border-white hover:text-white duration-700" >Commandez avec Glovo </Link>
                                </div>
                            )}
                        </div>
                        
                    </div>

                </div>
               
            </div>

        </div>
    )
}