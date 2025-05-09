"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar(){
    const pathname = usePathname();
    return(
        <div className=" bg-primary  w-full h-full min-h-screen flex flex-col items-start  gap-10 p-10 ">
            <div className=" flex flex-row items-center gap-2">
                <Image src={'/img/logo-white.png'} width={500} height={500} className="w-24" alt="franch food" title="franch food" />
                <h1 className=" font-primary text-2xl font-bold text-white">Admin Panel</h1>
            </div>
            <div className=" w-full flex flex-col justify-center font-semibold text-lg  gap-4 capitalize">
                <Link className={`font-primary  px-4 py-2 rounded-full ${ pathname === `/auth` ? "bg-white text-primary" : " text-white" }`} href={'/auth'} >tableau de bord</Link>
                <Link className={`font-primary  px-4 py-2 rounded-full ${ pathname === '/auth/product/show-product' ? "bg-white text-primary" : "text-white" }`} href={'/auth/product/show-product'}>voir tout le produit</Link>
                <Link className={`font-primary  px-4 py-2 rounded-full ${ pathname === '/auth/product/add-product' ? "bg-white text-primary" : "text-white" }`} href={'/auth/product/add-product'}>ajouter le produit</Link>
            </div>
        </div>
    )
}