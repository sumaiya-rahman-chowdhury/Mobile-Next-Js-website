"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiImage } from "react-icons/fi";

// ✅ File Upload Component
const FileUpload = ({ setProductImage }) => {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState();

  const handleFileChange = async (e) => {
    setUploaded(false)
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    if (data.url) {
      setProductImage(data.url); // Set the product image URL
      toast("Uploaded Successfully");
      setUploaded(true);
    } else {
      toast("Upload Failed");
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-black text-sm font-semibold mb-2">
        Product Image
      </label>
      <div className="relative flex flex-col items-center justify-center w-full px-4 py-6 bg-white/20 border border-white/30 rounded-lg cursor-pointer hover:bg-white/30 transition-all">
        {uploaded ? <div>Uploaded Done</div> : <div>Uploading.......</div>}
        {file && uploaded ? (
          <img
            src={URL.createObjectURL(file)} // Show the preview of the selected file before uploading
            alt="Preview"
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <FiImage className="text-black/80 text-2xl mb-2" />
        )}
        <input
          type="file"
          id="productImage"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default FileUpload;
