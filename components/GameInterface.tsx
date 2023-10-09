"use client"

import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react"


export default function GameInterface({initFunds, user}: any) {


  const {data : session } = useSession()  
  const [bet, setBet] = useState("")
  const [newFunds, setNewFunds] = useState(initFunds)
  const [outcome, setOutcome] = useState("")
  const [error, setError] = useState("")

  const initRender = useRef(true);

  useEffect(() => {
    if (initRender && newFunds === initFunds) {
      initRender.current = false
    } else {
      console.log("fetch")
      fetch(`api/users/?id=${user._id}`,{
        method: "PUT",
        headers : {
          "Content-type" : "application/json",
        },
        body : JSON.stringify({newFunds}),
      }
      )
    }
  }, [newFunds])

  const handleGameLogic = (betValue : number) => {

    setError("")

    if(!betValue){
      setError("Must bet a certain amount!")
      return
    }else if(betValue > newFunds){
      setError("Insufficent funds!")
      return
    }

    const outcomes = ["Double!","Keep...","Bankrupt!"]
    let RNG = Math.floor(Math.random() * outcomes.length)
    let result = outcomes[RNG]

    switch (result) {
      case "Double!":
        setNewFunds(newFunds + (betValue * 2))
        setOutcome(result)
        break;
      case "Bankrupt!":
        setNewFunds(newFunds - betValue)
        setOutcome(result)
        break;
      default:
        setOutcome(result)
        break;
    }
  }
  
  return (
        <div className="shadow-lg px-8 py-4 flex flex-col justify-between items-center gap-5 bg-white">
          <div className="flex flex-col gap-5 md:flex-rowjustify-between items-center">
              <span>Funds : ${newFunds}</span>
              <input
              onChange={(e) => {
                setBet(e.target.value)
                console.log(bet)
              }}
              type="number"
              min={0}
              placeholder="Your bet"
              className="border-b-2 border-gray-200 border-solid max-w-[35%]" 
              />
          </div>
          <div className="flex flex-col justify-center items-center gap-5 w-full">
            {error && (
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}
            <button
              className="bg-green-500 text-white font-bold px-4 py-1 rounded"
              onClick={() => {
                handleGameLogic(parseInt(bet))
              }}
            >
              Play game !!!
            </button>
            {(() => {
              switch (outcome) {
                case 'Double!':
                  return(
                    <div className="bg-green-500 font-bold text-center text-white w-full text-lg p-8 rounded-md">
                      {outcome}
                    </div>
                  )
                case 'Keep...':
                  return(
                    <div className="bg-yellow-500 font-bold text-center text-white  w-full text-lg p-8 rounded-md">
                      {outcome}
                    </div>
                  )
                case 'Bankrupt!':
                  return(
                    <div className="bg-red-500 text-center font-bold text-white w-full text-lg p-8 rounded-md">
                      {outcome}
                    </div>
                  )
                default:
                  return null
              }
            })()}
          </div>
        </div>
    )
}