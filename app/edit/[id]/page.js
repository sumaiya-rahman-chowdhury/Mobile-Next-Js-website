"use client";
import { editPost } from "@/app/action/mobiles";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditProduct() {
  // const [image, setImage] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const { id } = useParams();
  console.log(id);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    image: "",
  });
  // console.log(formData);
  useEffect(() => {
    const fetchedProduct = async () => {
      const res = await fetch(`http://localhost:3000/api/mobiles/${id}`);
      const result = await res.json();
      setFormData({
        name: result.name,
        price: result.price,
        image: result.image,
      });
    };
    fetchedProduct();
  }, [id]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    setFormData({ ...formData, image: result.secure_url });
    setUploaded(true);
    toast("Uploaded Successfully");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    editPost(id, formData);
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
              value={formData.name}
              type="text"
              id="name"
              onChange={handleChange}
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
              value={formData.price}
              type="number"
              id="price"
              onChange={handleChange}
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
            <img src={formData?.image} />
            <input
              //  value={formData.image}
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
            Save
          </button>
        </form>
      </div>
    </section>
  );
}
