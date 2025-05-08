"use client"
import { ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function RateForm() {
    const [rating, setRating] = useState(0); // State to store the selected rating

    const handleRating = (value) => {
        setRating(value);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-primary relative  ">
            <div className="w-full overflow-hidden whitespace-nowrap absolute inset-0 flex flex-col justify-center">
                <div className="animate-scrollright font-primary text-8xl uppercase font-bold text-white rotate-3">
                    <span className="px-4">Le poulet de votre quartier , croustillant et savoureux ! 🤪</span>
                    <span className="px-4">Le poulet de votre quartier , croustillant et savoureux ! 🤪</span>
                </div>
                <div className="animate-scrollright font-primary text-8xl uppercase font-bold text-white rotate-3">
                    <span className="px-4">La légende croustillante que tes papilles attendaient ! 😋</span>
                    <span className="px-4">La légende croustillante que tes papilles attendaient ! 😋</span>
                </div>
            </div>
            <div className=" bg-white border shadow-2xl border-black p-2 lg:p-6 lg:pb-20 relative z-20 lg:rotate-3 lg:animate-bounceCostomize m-4">
                <div className="bg-primary flex flex-col gap-4 p-6 lg:p-10 border border-black">
                    <h2 className="font-primary font-semibold text-white text-2xl lg:text-4xl text-center">
                        ÉVALUEZ VOTRE EXPÉRIENCE 
                    </h2>
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex flex-col font-primary gap-2 text-white">
                            <label htmlFor="date" className=" font-semibold">Date de la visite</label>
                            <input type="date" name="date" id="date" className="border text-black border-black  w-70 rounded-2xl h-12 px-4 bg-background" />
                        </div>
                        <div className="flex flex-col font-primary gap-2 text-white ">
                            <label htmlFor="rating" className=" font-semibold ">Notez-nous</label>
                            <div className="flex flex-row gap-2 ">
                                {[1, 2, 3, 4, 5].map((star,index) => (
                                    <Star key={index} onClick={() => handleRating(star)} className={`cursor-pointer ${ star <= rating ? "fill-yellow-400 stroke-yellow-400" : "fill-background stroke-background" }`} size={32} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex flex-col font-primary gap-2 text-white">
                            <label htmlFor="nom" className=" font-semibold">Nom</label>
                            <input type="text" name="nom" id="nom" className="border text-black border-black  w-70 rounded-2xl h-12 px-4 bg-background" placeholder="votre nom" />
                        </div>
                        <div className="flex flex-col font-primary gap-2 text-white">
                            <label htmlFor="email" className=" font-semibold">E-mail</label>
                            <input type="email" name="email" id="email" className="border text-black border-black  w-70 rounded-2xl h-12 px-4 bg-background" placeholder=" Entrez votre e-mail"/>
                        </div>
                    </div>
                    <div className="flex flex-col font-primary gap-2 text-white">
                        <label htmlFor="feedback" className=" font-semibold">Rétroaction</label>
                        <textarea name="feedback" id="feedback" rows={8} className="border rounded-2xl text-black border-black  w-full  px-4 bg-background p-4 " placeholder="Rédigez votre message" ></textarea>
                    </div>
                    <button href={'#'} className=' bg-white py-3 px-6  w-fit font-primary text-sm lg:text-lg font-semibold rounded-4xl text-primary hover:text-white border-white border-2 hover:bg-primary duration-700 uppercase flex items-center justify-center '>Envoyer<ChevronRight /></button>

                </div>
            </div>
           
        </div>
    );
}