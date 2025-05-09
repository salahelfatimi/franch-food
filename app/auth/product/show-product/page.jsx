'use client'
import Loading from "@/app/loading";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ProductDashboard() {
    const [products, setProducts] = useState([]); // State to store fetched products
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage errors
    console.log(products);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
            const response = await fetch("/api/product", { method: "GET" });
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            const data = await response.json();
            setProducts(data); // Set the fetched products in state
            } catch (err) {
            setError(err.message); // Handle errors
            } finally {
            setLoading(false); // Stop loading
            }
        };
        fetchProducts();
    }, []);

    const handleDelete = async (id,imageKey) => {
        const loadingToast = toast.loading("Deleting product...");
        try {
            const response = await fetch(`/api/product?id=${id}&imageKey=${imageKey}`, { method: "DELETE" });
            if (response.ok) {
            setProducts(products.filter(product => product.id !== id)); // Remove the deleted product from state
            toast.dismiss(loadingToast);
            toast.success("Product deleted successfully!");
            } else {
            throw new Error("Failed to delete product");
            }
        } catch (err) {
            toast.dismiss(loadingToast);
            toast.error("Error deleting product.");
        }
    };

    if (loading) {
        return <Loading />; // Show loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Show error message
    }

  
    return (
      <div className="p-4">
        <Toaster toastOptions={{ className: "bg-white text-black" }} />
        <h1 className="text-2xl font-bold mb-4 font-primary uppercase text-primary">Product Dashboard</h1>
        {products.length === 0 ? (
            <div className=" min-h-screen  flex flex-col items-center justify-center gap-4">
                <ShoppingBag className=" stroke-primary" size={70} />
                <p className=" font-primary text-4xl font-semibold">No products found.</p>
            </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {
                        products.map((product) => (
                            <div key={product.id} className="bg-white shadow-2xl p-4 mb-4 rounded-lg border-2 border-primary w-fit flex flex-col items-center gap-4">
                                <Image src={product.imageUrl}  alt={product.name} title={product.name} width={500} height={500} className=" h-72 shadow-xl  object-cover rounded-2xl"/>
                                <h2 className="text-3xl font-bold text-primary font-primary uppercase">{product.name}</h2> 
                                <p className="text-lg font-semibold text-primary font-primary uppercase">{product.price} MAD</p>
                                <p className="font-semibold text-primary font-primary uppercase">Category : {product.category}</p>
                                <button onClick={()=>(handleDelete(product.id,product.imageKey))} className=" cursor-pointer bg-red-500 hover:bg-white border-2 border-red-500 hover:text-red-500 duration-700 w-full py-2 rounded text-white font-semibold font-primary uppercase" >Supprimer Produit</button>
                                <Link href={`./update-product/${product.id}`}  className=" text-center cursor-pointer bg-green-500 hover:bg-white border-2 border-green-500 hover:text-green-500 duration-700 w-full py-2 rounded text-white font-semibold font-primary uppercase" >mise à jour produit</Link>

                            </div>
                            )
                        )
                    }
                    
                </div> 
            )
        }
      </div>
    );
}