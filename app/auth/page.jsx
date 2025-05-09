'use client'
import { PackageSearch } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../loading";

export default function Dashboard() {
  const [products, setProducts] = useState([]); // State to store fetched products
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage errors

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/product", {method: "GET",});
        if (!response.ok) {throw new Error("Failed to fetch products");}
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

  if (loading) {
    return <Loading/>; // Show loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 font-primary uppercase text-primary">Product tableau de bord</h1>
        <div>
            <div className=" bg-primary w-fit p-10 rounded-lg flex flex-col items-center gap-4 mb-4 shadow-2xl">
                <div><PackageSearch className=" stroke-white animate-pulse" size={70} /></div>
                <div><h2 className="text-3xl font-bold text-white font-primary uppercase">{products.length} Products</h2></div>
                <Link href={'/auth/product/show-product'} className=" text-sm text-center cursor-pointer bg-white hover:bg-primary border-2 border-white hover:text-white duration-700 w-full py-2 rounded text-primary font-semibold font-primary uppercase" >voir le produit</Link>
                <Link href={'/auth/product/add-product'} className=" text-sm text-center cursor-pointer bg-white hover:bg-primary border-2 border-white hover:text-white duration-700 w-full py-2 rounded text-primary font-semibold font-primary uppercase" >Ajouter Produit</Link>
            </div>
        </div>
    </div>
  );
}