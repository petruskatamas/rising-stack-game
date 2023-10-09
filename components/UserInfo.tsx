"use client"

import { signOut, useSession } from "next-auth/react";
import { useRouter as useNavRouter} from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function UserInfo() {

  const {data : session , status} = useSession()
  const navRouter = useNavRouter()
  const [isOpen, setIsOpen] = useState(false);


    return (
        <div className="absolute w-screen shadow-lg px-8 py-4 flex flex-row justify-between items-center bg-white">
          <div>
            <span className="font-bold">{session?.user?.name} | {session?.user?.email}</span>
          </div>
          <div className="hidden lg:flex flex-row gap-4">
            <button
              onClick={() => {
                navRouter.push("/leaderboard")
              }}
              className="bg-slate-400 text-white font-bold px-4 py-1 rounded"
            >
              Leaderboard
            </button>
            <button
              onClick={() => {
                navRouter.push("/dashboard")
              }}
              className="bg-slate-400 text-white font-bold px-4 py-1 rounded"
            >
              Dashboard
            </button>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white font-bold px-4 py-1 rounded"
            >
              Log Out
            </button>
          </div>
          <div className="lg:hidden md:block relative">
            <button onClick={() => setIsOpen(!isOpen)} 
            className="flex flex-col justify-center items-center">
              <span className={`bg-black block transition-all duration-300 ease-out 
                              h-0.5 w-6 rounded-sm ${isOpen ? 
                              'rotate-45 translate-y-1' : '-translate-y-0.5'
                              }`} >
              </span>
              <span className={`bg-black block transition-all duration-300 ease-out 
                              h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 
                              'opacity-0' : 'opacity-100'
                              }`} >
              </span>
              <span className={`bg-black block transition-all duration-300 ease-out 
                              h-0.5 w-6 rounded-sm ${isOpen ? 
                              '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                              }`} >
              </span>    
            </button>
          </div>
          {
            isOpen && 

            <div className="absolute top-12 right-0 shadow-lg px-8 py-4 flex flex-col justify-between items-center gap-5 bg-white">
              <button
              onClick={() => {
                navRouter.push("/leaderboard")
              }}
              className="bg-slate-400 text-white font-bold px-4 py-1 rounded w-full"
            >
              Leaderboard
            </button>
            <button
              onClick={() => {
                navRouter.push("/dashboard")
              }}
              className="bg-slate-400 text-white font-bold px-4 py-1 rounded w-full"
            >
              Dashboard
            </button>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white font-bold px-4 py-1 rounded w-full"
            >
              Log Out
            </button>
            </div>

          }
        </div>
    );
}