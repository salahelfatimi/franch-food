import Image from "next/image";
import Link from "next/link";

export default function FirstPage(){
    return(
        <div className=" bg-primary  min-h-screen py-10 lg:py-0">
            <div className=" flex flex-col lg:flex-row min-h-screen px-2 justify-center items-center gap-4 ">
                <div className=" lg:w-1/2 h-[80vh] bg-white p-2 shadow-2xl relative flex justify-center items-center rounded-xl">
                    <Image src={'/img/FrenchFood-4.JPG'} width={1920} height={1080} className=" w-full h-full object-cover rounded-xl " alt="French food" title=" French food"/>
                    <Link href={'/french_food'} className=" absolute bottom-6 left-2 right-2 mx-2 lg:mx-auto p-3 bg-white w-fit flex flex-row items-center gap-4 rounded-xl  hover:mb-2 duration-700">
                        <div className=" bg-primary rounded-xl shadow-2xl">
                            <Image src={'/img/logo-white.png'} width={500} height={500} className=" animate-bounce object-center min-h-20 min-w-20 max-h-20 max-w-20 lg:max-h-24 lg:max-w-24" alt="French food" title=" French food"/>
                        </div>
                        <div className=" flex  flex-col font-primary  lg:text-base text-xs ">
                            <h2 className=" font-bold text-xl">French food</h2>
                            <p><strong className=" text-primary">Address : </strong> 397 Av. Guemassa, Marrakech 40000</p>
                            <p><strong className=" text-primary">Téléphone : </strong> 05243-79716</p>
                            <p><strong className=" text-primary">Ouvert tous les jours : </strong>  11h30 à 3h00 (Vendredi ouverture à 13h30)</p>
                        </div>
                    </Link>
                </div>
                <div className=" lg:w-1/2 h-[80vh] bg-white p-2 shadow-2xl relative flex justify-center items-center rounded-xl">
                    <Image src={'/img/FrenchFood-4.JPG'} width={1920} height={1080} className=" w-full h-full object-cover rounded-xl " alt="French food" title=" French food"/>
                    <Link href={'#'} className=" absolute bottom-6 left-2 right-2 mx-2 lg:mx-auto p-3 bg-white w-fit flex flex-row items-center gap-4 rounded-xl  hover:mb-2 duration-700">
                        <div className=" bg-primary rounded-xl shadow-2xl">
                            <Image src={'/img/logo-white.png'} width={500} height={500} className=" animate-bounce object-center min-h-20 min-w-20 max-h-20 max-w-20 lg:max-h-24 lg:max-w-24" alt="French food" title=" French food"/>
                        </div>
                        <div className=" flex  flex-col font-primary  lg:text-base text-xs ">
                            <h2 className=" font-bold text-xl">French food 2</h2>
                            <p><strong className=" text-primary">Address : </strong> 397 Av. Guemassa, Marrakech 40000</p>
                            <p><strong className=" text-primary">Téléphone : </strong> 05243-79716</p>
                            <p><strong className=" text-primary">Ouvert tous les jours : </strong>  11h30 à 3h00 (Vendredi ouverture à 13h30)</p>
                        </div>
                    </Link>
                </div>
            </div>
            
        </div>
    )
}