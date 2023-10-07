import UserInfo from "@/components/UserInfo";
import Game from "@/components/Game";

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

  return (
    <>
      <UserInfo />
      <Game db={db}/>
    </>
    );
}