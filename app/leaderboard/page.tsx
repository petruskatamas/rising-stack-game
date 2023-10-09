import UserInfo from "@/components/UserInfo"

const getDatabse = async() => {
  try{
      const res = await fetch(`http://localhost:3000/api/users`,
      { cache: "no-store"}
      )
      if(!res.ok){
          throw new Error('Failed to load database')
      }
      return res.json()

  } catch(error) {
      console.log("Error loading database")
  }
}

export default async function Dashboard() {

  const db = await getDatabse()
  const sortedDB = db?.users.sort((a : any, b : any) => b.funds - a.funds)

  return (
    <>
        <UserInfo />
        <div className="flex justify-center items-center h-screen w-screen">
            <div className="shadow-lg px-8 py-4 flex flex-col justify-between items-center gap-5 bg-white w-[70%]">
                <h1 className="font-bold text-2xl">Leaderboard</h1>
                {sortedDB.map((user : any ,index : number) => (
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