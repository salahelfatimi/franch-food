"use client";
import React, { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

function ProductForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [validation, setValidation] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category:"",
    image: null,
    customOptions: [{ name: "", price: "" }], 
  });
  console.log(formData);

  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value, }));
  };

  const handleCustomOptionChange = (index, field, value) => {
    const updatedOptions = [...formData.customOptions];
    updatedOptions[index][field] = value;
    setFormData((prev) => ({ ...prev, customOptions: updatedOptions }));
  };

  const addCustomOption = () => {
    setFormData((prev) => ({
      ...prev,
      customOptions: [...prev.customOptions, { name: "", price: "" }],
    }));
  };

  const removeCustomOption = (index) => {
    const updatedOptions = formData.customOptions.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, customOptions: updatedOptions }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file, }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidation(true);
    if ( formData.name && formData.description && formData.price && formData.image && formData.customOptions.every((option) => option.name && option.price)){
        setIsLoading(true);
        const loadingToast = toast.loading("Uploading product...");
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("image", formData.image);
        formDataToSend.append("customOptions",JSON.stringify(formData.customOptions));
        try {
            const res = await fetch("/api/product", { method: "POST", body: formDataToSend, });
            if (res.ok) {
            toast.dismiss(loadingToast);
            toast.success("Product uploaded successfully!");
            setFormData({
                name: "",
                description: "",
                price: "",
                category:"",
                image: null,
                customOptions: [{ name: "", price: "" }],
            });
            if (fileInputRef.current) fileInputRef.current.value = "";setValidation(false);} 
            else {throw new Error("Failed to upload");}
        } catch (err) {
            toast.dismiss(loadingToast);
            toast.error("Error uploading product.");
        } finally {
            setIsLoading(false);
        }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <h2 className="flex gap-1 items-center text-primary font-bold text-xl font-primary uppercase">Upload Product </h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-primary">
        <Toaster toastOptions={{ className: "bg-white text-black" }} />

        {/* Image Upload */}
        <label className="block space-y-2">
          <span className="block font-medium text-sm text-slate-700">Product Image (JPG/PNG) *</span>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className={`${ !formData.image && validation && "border-red-500" } w-full bg-white border p-3 rounded text-sm file:bg-primary file:text-white file:rounded file:mr-4 file:py-2 file:px-4 file:border-none file:font-semibold`} />
          {validation && !formData.image && ( <p className="text-xs text-red-500">Please upload an image</p> )}
        </label>

        {/* Name */}
        <label className="block space-y-2">
          <span className="block font-medium text-sm text-slate-700">Product Name *</span>
          <input name="name" value={formData.name} onChange={handleInputChange} className={`${ !formData.name && validation && "border-red-500" } bg-white border p-3 rounded text-sm w-full`} />
          {validation && !formData.name && ( <p className="text-xs text-red-500">Please enter product name</p> )}
        </label>

        {/* Description */}
        <label className="block space-y-2">
          <span className="block font-medium text-sm text-slate-700">Description *</span>
          <textarea rows={4} name="description" value={formData.description} onChange={handleInputChange} className={`${ !formData.description && validation && "border-red-500" } bg-white border p-3 rounded text-sm w-full`} />
          {validation && !formData.description && ( <p className="text-xs text-red-500">Please enter a description</p> )}
        </label>

         {/* Description */}
         <label className="block space-y-2">
          <span className="block font-medium text-sm text-slate-700">Category *</span>
          <input name="category" value={formData.category} onChange={handleInputChange} className={`${ !formData.category && validation && "border-red-500" } bg-white border p-3 rounded text-sm w-full`} />
          {validation && !formData.category && ( <p className="text-xs text-red-500">Please enter a category</p> )}
        </label>


        {/* Price */}
        <label className="block space-y-2">
          <span className="block font-medium text-sm text-slate-700">Price (MAD) *</span>
          <input type="number" name="price" value={formData.price} onChange={handleInputChange} className={`${ !formData.price && validation && "border-red-500" } bg-white border p-3 rounded text-sm w-full`} />
          {validation && !formData.price && ( <p className="text-xs text-red-500">Please enter the price</p> )}
        </label>

        {/* Custom Options */}
        <label className="block space-y-2">
        <span className="block font-medium text-sm text-slate-700">
            Custom Options (Name and Price) *
        </span>
        <div className="border border-gray-300 rounded p-4 space-y-2">
                {formData.customOptions.map((option, index) => (
                <div key={index} className="grid lg:grid-cols-3 gap-4 items-center mb-2 bg-gray-300 border rounded p-3">
                    <input type="text" placeholder="Option Name (e.g., Red)" value={option.name} onChange={(e) => handleCustomOptionChange(index, "name", e.target.value) } className={`${ validation && !option.name && "border-red-500" } bg-white border p-3 rounded text-sm`} />
                    <input type="number" placeholder="Option Price (e.g., 10)" value={option.price} onChange={(e) => handleCustomOptionChange(index, "price", e.target.value) } className={`${ validation && !option.price && "border-red-500" } bg-white border p-3 rounded text-sm`} />
                    <button type="button" onClick={() => removeCustomOption(index)} className="bg-red-500 hover:bg-white  hover:text-red-500 border rounded cursor-pointer border-red-500 p-2 text-white font-bold" > Remove </button>
                </div>
                ))}
                {/* Add Option Button */}
                <button type="button" onClick={addCustomOption} className="mt-2 text-primary font-bold" > Add Option </button>
            </div>
        </label>

        <button type="submit" className="w-full py-2 rounded font-bold bg-primary text-white hover:bg-white hover:text-primary border-4 border-primary transition" disabled={isLoading} >
          {isLoading ? "Uploading..." : "Submit Product"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
