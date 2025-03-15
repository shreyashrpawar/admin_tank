"use client";

import { useState,useEffect } from "react";
import Sidebar from "../components/sidebar";
import Cookies from 'js-cookie';

export default function products(){

  const [image, setImage] = useState(null);
  const [headText, setheadText] = useState("");
  const [description, setdescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');
        if (!token) {
          console.error('No token found!');
          window.location.href = '/login';
        }
    const formData = new FormData();
    formData.append("image", image);
    formData.append("headText", headText);
    formData.append("description", description);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Upload successful!");
        setheadText("");
        setdescription("");
        setImage(null);
      } else {
        alert(data.message || "Upload failed!");
      }
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Something went wrong!");
    }
  };

useEffect(()=>{
  const token = Cookies.get('token');
        if (!token) {
          window.location.href = '/login';
        }
},[])


  return(
      <>
      <Sidebar/>
          <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Upload Form</h2>

        {/* Head Text */}
        <input
          type="text"
          placeholder="Enter Head Text"
          value={headText}
          onChange={(e) => setheadText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        {/* Description */}
        <textarea
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        ></textarea>

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Upload
        </button>
      </form>
    </div>
      </>
  );
}