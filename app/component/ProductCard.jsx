"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { deleteProduct } from "../action/mobiles";
import { useSession } from "next-auth/react";

const ProductCard = ({ product }) => {
  // console.log(product);
  // const { image, name, price } = product;
  // console.log(image, name, price)
  const { data, status } = useSession();
  const handleDelete = async (id) => {
    console.log(id);
    deleteProduct(id);
  };
  return (
    <div className="bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden transition duration-300 hover:shadow-xl ">
      <div className="flex flex-col">
        {/* Image Section */}
        <div className="group relative w-full  overflow-hidden
        flex justify-center
        ">
          <img
            className="w-[200px] h-48 md:h-full object-cover transition-transform duration-300 group-hover:scale-110"
            src={product?.image}
            alt={product?.name}
          />
        </div>

        {/* Product Details */}
        <div className="p-5 flex flex-col justify-between ">
          <div>
            <h2 className="text-xl font-semibold text-black">
              {product?.name}
            </h2>
            <p className="text-gray-600 text-lg font-medium mt-1">
              ${product?.price}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex gap-3">
            <Link
              href={`/details/${product._id}`}
              className="px-4 py-2 text-sm font-semibold text-black border-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              View Details
            </Link>

            {status === "authenticated" &&
              (data?.user?.role === "admin" ||
                data?.user?.role === "super-admin") && (
                <>
                  <button
                    onClick={() => handleDelete(product?._id)}
                    className="px-4 py-2 text-sm font-semibold text-black border-2 border-red-600 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                  <Link
                    href={`/edit/${product?._id}`}
                    className="px-4 py-2 text-sm font-semibold text-green-800 border-2 border-green-500 rounded-lg hover:bg-green-600 transition duration-300"
                  >
                    Edit
                  </Link>
                </>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
