'use client'
import { useState,useEffect } from "react";
import Cookies from "js-cookie";
import Sidebar from "../components/sidebar";

const generatedRequests=async(setDatas)=>{
const token = Cookies.get('token');
    if (!token) {
      console.error('No token found!');
      return;
    }
  const requests=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pendingRequest/all`,{
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
  })
  const result = await requests.json();
  console.log(token)
  console.log(result);
  if (requests.ok) {
    setDatas(result);     
  } else {
    alert("failed!");
  }
} 



export default function redeem(){
  const [token, setToken] = useState("");
  const [datas, setDatas] = useState([]);



  useEffect(() => {
    generatedRequests(setDatas);
  }, [token]);

  const approveRequests=async(id)=>{
const token = Cookies.get('token');
    if (!token) {
      console.error('No token found!');
      return;
    }
    const requests=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/approveRequest/${id}`,{
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
    })
    const result = await requests.json();
    console.log(token)
    console.log(result);
    if (requests.ok) {
      alert("deleted successfully");
      generatedRequests(setDatas);  
    } else {
      alert(result.message || "failed!");
    }
  } 
  useEffect(()=>{
    const token = Cookies.get('token');
          if (!token) {
            window.location.href = '/login';
          }
  },[])

  return(<>
    <Sidebar/>
    <div className="absolute left-150 mt-5">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    GST No.
                </th>
                <th scope="col" className="px-6 py-3">
                    Redeem Points
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
    <tbody>



  {(datas?.length > 0 ? datas : []).map((data) => (
<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
    {data.GST_no}
</th>
<td className="px-6 py-4">
{data.points}
</td>
<td className="px-6 py-4">
<button type="button" onClick={() => approveRequests(data.id)}  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Approve</button>
<button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
</td>
{/* <td className="px-6 py-4">
<button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>

</td> */}
</tr>
  )
  )}
  </tbody>
</table>
</div>
    </>
  )
}