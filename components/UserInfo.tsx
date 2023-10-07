"use client"

import { signOut, useSession } from "next-auth/react";

export default function UserInfo() {

  const {data : session , status} = useSession()


    return (
        <div className="absolute w-screen shadow-lg px-8 py-4 flex flex-row justify-between items-center bg-white">
          <div>
            <span className="font-bold">{session?.user?.name} | {session?.user?.email}</span>
          </div>
          <div className=" flex flex-row gap-4">
            <button
              className="bg-slate-400 text-white font-bold px-4 py-1 rounded"
            >
              Leaderboard
            </button>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white font-bold px-4 py-1 rounded"
            >
              Log Out
            </button>
          </div>
        </div>
    );
}