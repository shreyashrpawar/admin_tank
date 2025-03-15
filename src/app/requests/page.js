'use client'
import { useState,useEffect } from "react";
import Sidebar from "../components/sidebar";
import Cookies from 'js-cookie';

export default function requests(){
  
    const [GST_number, setGST_number] = useState("");
    const [hashTag, setHashTag] = useState("");
    const [amount,setAmount]=useState(0);
    const handleSubmit = async (e) => {
      e.preventDefault();
          const token = Cookies.get('token');
      
      const datas = {
        "GST_number":GST_number,
        "hashTag":hashTag,
        "amount": Number(amount), // Ensure it's a number
      };
      console.log(datas);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requests/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(datas),
        });
  
        const data = await res.json();
        if (res.ok) {
          alert("Submitted successfully!");
          setGST_number("");
          setHashTag("");
          setAmount(0);
        } else {
          alert(data.message || "Form failed!");
        }
      } catch (error) {
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
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Add Requests</h2>

        {/* GST Number */}
        <input
          type="text"
          placeholder="GST Number"
          value={GST_number}
          onChange={(e) => setGST_number(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        {/* HashTag */}
        <input
          type="text"
          placeholder="HashTag"
          value={hashTag}
          onChange={(e) => setHashTag(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        {/* Amount */}
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>

            </>
  );
}