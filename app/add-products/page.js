"use client";
import React, { useState } from "react";
import { addProduct } from "../action/mobiles";
import toast from "react-hot-toast";

function AddProducts() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [uploaded, setUploaded] = useState(false);

  // const [product, setProduct] = useState({
  //   name,
  //   price,
  //   file,
  // });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const product = {
        name,
        price,
        image,
      };
      console.log(product);
      addProduct(product);
      toast("Product Added Successfully");
    } catch (error) {
      toast("Something Went Wrong");
    }
  };
  const handleImage = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const data = new FormData();
    //this is the file we send to cloudinary
    data.append("file", file);
    // this is the upload preset from our cloudinary account
    data.append("upload_preset", "our-first-project");
    // this is the cloud name from our cloudinary account
    data.append("cloud_name", "ddwb8h3lt");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/ddwb8h3lt/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();
    console.log(result.secure_url);
    // result.secure_url will held the image url.
    setImage(result.secure_url);
    setUploaded(true);
    toast("Uploaded Successfully");
  };

  return (
    <section>
      <div className="max-w-md mx-auto mt-8 bg-white p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              name="name"
              placeholder="Enter product name"
              className="w-full px-4 py-2 mt-2 border border-gray-300 text-black bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-semibold text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              onChange={(e) => setPrice(Number(e.target.value))}
              name="price"
              placeholder="Enter price"
              className="w-full px-4 py-2 mt-2 border border-gray-300 text-black bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-semibold text-gray-700"
            >
              Image
            </label>
            <input
              onChange={handleImage}
              type="file"
              id="image"
              name="image"
              className="w-full px-4 py-2 mt-2 border border-gray-300 text-black bg-white rounded-lg file:bg-gray-200 file:text-black file:py-2 file:px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
            />
          </div>

          <button
            disabled={!uploaded}
            type="submit"
            className="w-full py-2 px-4 mt-6 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200
            disabled:bg-gray-400 disabled:cursor-not-allowed
            "
          >
            Add Product
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddProducts;
