'use client';
import { useState,useEffect } from "react";
import Cookies from 'js-cookie';
import Sidebar from "./components/sidebar";

export default function dashboard(){
  useEffect(()=>{
    const token = Cookies.get('token');
          if (!token) {
            window.location.href = '/login';
          }
  },[])
  return(<>
    <Sidebar/>
    <h1 className="absolute left-200">Go to required section through sidebar</h1>
    </>
  );
}