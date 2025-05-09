"use client"
import Loading from "@/app/loading";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { Store } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function ScrollFood(){
    const [products, setProducts] = useState([]); // State to store fetched products
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage errors
    const [emblaRef] = useEmblaCarousel({ loop: true }, [
        AutoScroll({ stopOnInteraction: false, stopOnMouseEnter: true, speed: 0.7 })
    ]);
    useEffect(() => {
            const fetchProducts = async () => {
                try {
                const response = await fetch(`/api/product`, { method: "GET" });
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                setProducts(data); 
                } catch (err) {
                setError(err.message); 
                } finally {
                setLoading(false); 
                }
            };
            fetchProducts();
    }, []);
    if (loading) {
      return <Loading />; // Show loading state
    }
    
    if (error) {
      return <div>Error: {error}</div>; // Show error message
    }
    return(
        <div className=" py-10">
            <h2 className=" px-2 font-primary text-3xl lg:text-6xl font-bold uppercase text-center">Tu vas avoir faim... <span className=" text-primary">très faim</span> 😋</h2>
            <div className=" pt-10 ">
                <div className="overflow-hidden " ref={emblaRef}>
                    <div className="flex flex-row gap-20 pl-20">
                        {products.map((product,index) => (
                            <div key={index} className="flex flex-col gap-3 group cursor-pointer ">
                                <Image src={product.imageUrl}  alt={product.name} title={product.name}  width={1000} height={1000} className=" group-hover:scale-95 duration-700 min-w-80 min-h-80 object-cover rounded-full shadow-2xl border-4 border-primary" />
                                <h3 className=" font-primary text-4xl font-medium text-center">{product.name}</h3>
                                <p className=" font-primary text-sm text-center">{product.description}</p>
                                <p className=" font-primary text-sm text-center">{product.price} MAD</p>
                                {/* <button className=" cursor-pointer hover:bg-white hover:text-primary border-2 border-primary duration-700 font-primary bg-primary text-white py-2 font-medium uppercase rounded-full">Je veux celui-là !</button> */}
                            </div>
                        ))}
                    </div>
                    <div className='flex items-center justify-center pt-10'>
                        <Link href={'#'} className=' bg-primary py-3 px-6  w-fit font-primary text-sm lg:text-lg font-semibold rounded-4xl text-white hover:text-primary border-primary border-2 hover:bg-white duration-700 uppercase flex gap-2'><Store /> Le paradis des gourmands t’attend </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}