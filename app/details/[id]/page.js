"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function ProductDetails() {
  const [productDetails, setProductDetails] = useState(null);
  const { id } = useParams();
  console.log(id);
  // const api = process.env.NEXT_PUBLIC_API_BASE_URL;

  // console.log("This is from Details page : ",api)
  useEffect(() => {
    // Ensure that `id` is available before making the API request
    if (id) {
      const fetchProductDetails = async () => {
        const res = await fetch(`https://simple-nextjs-web-eosin.vercel.app/api/mobiles/${id}`);
        // console.log(`This is from Details page 2 ${api}/api/mobiles/${id}`)
        const result = await res.json();
        setProductDetails(result); // Update the state with the fetched product details
      };

      fetchProductDetails();
    }
  }, [id]);
  console.log("product data", productDetails);
  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row max-w-3xl w-full">
        {/* Image Section */}
        <div className="w-full md:w-1/2 overflow-hidden">
          <img
            src={productDetails?.image}
            alt={productDetails?.name}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center text-black">
          <h3 className="text-2xl font-semibold">{productDetails?.name}</h3>
          <p className="text-gray-700 text-sm mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries,
          </p>
          <p className="text-xl font-bold mt-3">${productDetails?.price}</p>
          <button className="mt-4 px-5 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
