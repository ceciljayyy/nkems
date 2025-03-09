"use client";

import { useGetProductsQuery } from "@/state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import Header from "@/app/{components}/Header";
import Rating from "@/app/{components}/Rating";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModelOpen, setIsModelOpen] = useState(false);

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);

  // Show loading state
  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  // Show error state
  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">Error: Failed to Fetch</div>
    );
  }

  return (
    <div className="mx-auto pb-5 w-full">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-300 focus-within:border-blue-500 rounded-md overflow-hidden">
          <SearchIcon className="w-7 h-7 text-blue-500 m-3" />
          <input
            className="bg-white px-4 py-2 w-full focus:outline-none rounded-r-md"
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Header Bar with Create Product Button */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <button
          className="flex items-center bg-blue-500 font-bold hover:bg-blue-700 text-white px-6 py-3 rounded shadow-md"
          onClick={() => setIsModelOpen(true)}
        >
          <PlusCircleIcon className="w-6 h-6 mr-2 text-white" />
          Create Product
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
        {products.map((product) => (
          <div
            key={product.productId}
            className="border shadow bg-white rounded-md p-4 max-w-full w-full mx-auto"
          >
            <div className="flex flex-col items-center">
              img
               
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {product.name}
              </h3>
              
              <div className="flex justify-between items-center w-full mb-4">
                <div className="text-lg font-bold">${product.price}</div>
                <div className="text-lg font-semibold text-gray-800">
                  Stock: {product.stockQuantity}
                </div>
              </div>
              {product.rating && (
                <div className="flex items-center mb-4">
                  <Rating rating={product.rating} />
                </div>
              )}
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;