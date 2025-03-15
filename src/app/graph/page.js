'use client';
import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect,useState } from 'react';
import Cookies from 'js-cookie';
import Sidebar from '../components/sidebar';


export default function graph(){
  const [token, setToken] = useState("");
  const [datasets,setDatasets]=useState([]);
  const requestHistory = async (e) => {
    const token = Cookies.get('token');
    if (!token) {
      console.error('No token found!');
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requestsHistory`, {
        method: "GET",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log(data);
      const safeValue = value => (isNaN(value) ? 0 : value);
      const dataset = data.map(item => ({
        x: `${item.start_date} to ${item.end_date}`,
        y: safeValue(parseInt(item.total_points, 10)), // Convert and ensure a valid number
      }));
      console.log(dataset);
      setDatasets(dataset);
      
      if (res.ok) {
        alert("Fetched successfully!");
      } else {
        alert(data || "Form failed!");
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

      useEffect(()=>{
          requestHistory();
      },[])

  return(<>
<Sidebar/>
<div className='absolute left-75 top-20'>
  <h1>Requests amount for last 6 weeks</h1>
    <LineChart
      dataset={datasets}
      xAxis={[{ dataKey: 'x',scaleType:'point' }]}
      series={[{ dataKey: 'y' }]}
      height={400}
      width={1200}
      margin={{ left: 100, right: 50, top: 50, bottom: 50 }}
      grid={{ vertical: true, horizontal: true }}
    />
    </div>
    </>
  )
}