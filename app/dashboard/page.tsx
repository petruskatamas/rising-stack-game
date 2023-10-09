"use client"

import UserInfo from "@/components/UserInfo";
import Game from "@/components/Game";
import { useEffect, useState } from "react";
import AuthLoading from "@/components/AuthLoading";

export default function Dashboard() {
  
  const [data, setData] = useState()

  useEffect(() => {
      fetch(`api/users/`, { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  },[])

  if(!data){
    return(
        <div className="flex justify-center items-center h-screen w-screen">
            <AuthLoading />
        </div>
    )
  }else{
    return (
      <>
        <UserInfo />
        <Game db={data}/>
      </>
      );
    }
}