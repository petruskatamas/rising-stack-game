"use client"

import AuthLoading from "@/components/AuthLoading"
import UserInfo from "@/components/UserInfo"
import { useState, useEffect } from "react"

export default function Leaderboard() {

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

    const sortedDB = data?.users.sort((a, b) => b.funds - a.funds)

    return (
        <>
            <UserInfo />
            <div className="flex justify-center items-center h-screen w-screen">
                <div className="shadow-lg px-8 py-4 flex flex-col justify-between items-center gap-5 bg-white w-[70%]">
                    <h1 className="font-bold text-2xl">Leaderboard</h1>
                    {sortedDB.map((user,index) => (
                    <div key={index} className="flex flex-row justify-between bg-slate-200 font-bold px-2 py-1 rounded w-full">
                        <span>{index + 1}.</span>
                        <span>{user.name}</span>
                        <span>${user.funds}</span>
                    </div>
                    ))}
                </div>
            </div>
        </>
        );
    }
}