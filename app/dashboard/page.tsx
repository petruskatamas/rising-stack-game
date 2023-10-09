"use client"

import UserInfo from "@/components/UserInfo";
import Game from "@/components/Game";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AuthLoading from "@/components/AuthLoading";

export default function Dashboard() {
  
  const [data, setData] = useState()
  const {status} = useSession()  


  useEffect(() => {
      fetch(`api/users/`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  },[])

  if(status === "loading"){
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