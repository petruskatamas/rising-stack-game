"use client"

import { useSession } from "next-auth/react"
import GameInterface from "./GameInterface"

export default function Game({db}: any) {
 
  const {data : session} = useSession()  

  const filterableDB = db?.users
  const userInDB = filterableDB.filter((user:any) => session?.user?.email === user.email)
  const initFunds = userInDB[0]?.funds

  return (
      <div className="flex justify-center items-center h-screen w-screen">
        <GameInterface initFunds={initFunds} user={userInDB[0]}/>
      </div>
    )
}