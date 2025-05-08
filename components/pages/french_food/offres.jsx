'use client'
import { Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Offres(){
    const [offres,setOffres]=useState(2)
    const [showOffres,setShowOffres]=useState(false)
    const handleClick = () => {
        if(offres<3){
            setOffres((prev) => prev + 1); 
        }
    };
    const handleOffre = () => {
        setShowOffres(!showOffres)
    };
    return(
        <div className="  flex flex-col gap-4 py-10 bg-secondary">
            <h2 className=" font-primary text-center text-3xl lg:text-6xl font-semibold uppercase">Les Offres Qui Font Craquer (et saliver) 🤪</h2>
            {
                showOffres == false && (
                    <div className=" p-5 lg:p-10 flex flex-col gap-10">
                        {offres === 3 && (
                            <p className="text-center text-3xl font-medium text-red-500 font-primary">
                            Clique sur une pizza pour en supprimer une 🍕
                            </p>
                        )}
                        <div className=" flex flex-col lg:flex-row gap-6 items-center justify-center">
                            {
                                Array.from({ length: offres }).map((offre, index) => (
                                    <Image key={index} alt="french food" title="french food"  src={'/img/offres/pizza.png'} width={1000} height={1000} quality={20} className={`{} w-70 lg:w-96`} onClick={() => (offres == 3 && setOffres((prev) => prev - 1))} />
                                ))
                            }
                            <button onClick={handleClick} className={` ${offres == 3 ? 'hidden' : 'block'} relative animate-bounceCostomize cursor-pointer`}>
                                <div className=" absolute inset-0 z-10 flex flex-col items-center justify-center">
                                    <span className=" font-primary text-2xl lg:text-4xl font-semibold">Ajouter</span>
                                </div>
                                <Image src={'/img/offres/pizza.png'} width={500} height={500} quality={20} className=" w-70 lg:w-96 opacity-25 " alt="french food" title="french food" />
                            </button>
                        </div>
                        <div className=" flex gap-10 items-center justify-center" onClick={handleOffre}>
                            <button className='cursor-pointer bg-primary py-3 px-6  w-fit font-primary text-sm lg:text-lg font-semibold rounded-4xl text-white hover:text-primary border-primary border-2 hover:bg-white duration-700 uppercase flex items-center justify-center '>Combien de pizzas tu veux ? Clique pour voir la surprise 👀</button>
                        </div>
                    </div>
                )
            }
            {
                showOffres == true && offres == 2 && (
                    <div className=" p-5 lg:p-10 flex flex-col justify-center items-center gap-10">
                        <div className=" flex flex-col lg:flex-row gap-10 items-center justify-center  ">
                            <Image src={'/img/offres/juice.png'} quality={20} width={500} height={500} className=" w-52 rotate-6 animate-bounceCostomize" alt="french food" title="french food"/>
                            <div className="lg:w-full text-lg lg:text-3xl font-medium uppercase space-y-2">
                                <h3 className="font-primary font-bold ">- 1 Litre de Fraîcheur Offert !</h3>
                                <p className=" font-primary">Un jus bien frais, 1L de pur kiff </p>
                                <p className=" font-primary">Parce qu’un festin, ça se sirote aussi 😎</p>
                                
                            </div>
                        </div>
                        <div className=" flex gap-10 items-center justify-center" onClick={handleOffre}>
                            <button className='cursor-pointer bg-primary py-3 px-6  w-fit font-primary text-sm lg:text-lg font-semibold rounded-4xl text-white hover:text-primary border-primary border-2 hover:bg-white duration-700 uppercase flex items-center justify-center '>Changer la quantité de pizzas 🔄</button>
                        </div>
                    </div>
                )
            }
            {
                showOffres == true && offres == 3 && (
                    <div className=" p-5 lg:p-10 flex flex-col gap-10 items-center justify-center">
                        <div className=" flex flex-col lg:flex-row gap-10 items-center justify-center ">
                            <Image src={'/img/offres/pizza.png'} quality={20} width={500} height={500} className=" w-96 rotate-6 animate-bounceCostomize" alt="french food" title="french food"/>
                            <div className=" lg:w-full text-lg lg:text-3xl font-medium uppercase space-y-2">
                                <h3 className="font-primary font-bold ">- 1 Pizza Gratuite ? Oui Chef !</h3>
                                <p className=" font-primary">C’est pas de la magie, c’est juste notre façon de dire <br className=" hidden lg:block" /> merci avec du fromage 🧀😋</p>
                            </div>
                        </div>
                        <div className=" flex gap-10 items-center justify-center" onClick={handleOffre}>
                            <button className=' cursor-pointer bg-primary py-3 px-6  w-fit font-primary text-sm lg:text-lg font-semibold rounded-4xl text-white hover:text-primary border-primary border-2 hover:bg-white duration-700 uppercase flex items-center justify-center '>Changer la quantité de pizzas 🔄</button>
                        </div>
                    </div>
                )
            }
            
        </div>
    )
}