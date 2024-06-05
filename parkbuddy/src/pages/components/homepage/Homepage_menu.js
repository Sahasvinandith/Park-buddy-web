import { useEffect, useState } from "react"

export const Homepage_menu=()=>{
    const[mode,setmode]=useState(false);
    useEffect(()=>{
        console.log("Current mode: ",mode)
    },[mode])
    return(
        <div className={mode && "dark"}>
            <div className=' h-[calc(100vh-64px)]  sm:w-56 md:w-56 lg:w-72 font-extrabold flex flex-col bg-gray-800'>
                <div className=" flex flex-1 border-8  border-gray-700 my-2 rounded-3xl hover:cursor-pointer mx-4 justify-center items-center text-3xl text-yellow-500 text-center hover:bg-gray-900 hover:border-gray-800 hover:text-yellow-400 duration-200" >My Park</div>
                <div className=" flex flex-1  border-8  border-gray-700 my-2 rounded-3xl hover:cursor-pointer mx-4 justify-center items-center text-3xl text-yellow-500 text-center hover:bg-gray-900 hover:border-gray-800 hover:text-yellow-400 duration-200">Wallet</div>
                <div className=" flex flex-1  border-8  border-gray-700 my-2 rounded-3xl hover:cursor-pointer mx-4 justify-center items-center text-3xl text-yellow-500 text-center hover:bg-gray-900 hover:border-gray-800 hover:text-yellow-400 duration-200">History</div>
                <div className=" flex flex-1  border-8  border-gray-700 my-2 rounded-3xl hover:cursor-pointer mx-4 justify-center items-center text-3xl text-yellow-500 text-center hover:bg-gray-900 hover:border-gray-800 hover:text-yellow-400 duration-200">Account & Settings</div>
                <div className=" flex flex-1  border-8  border-gray-700 my-2 rounded-3xl hover:cursor-pointer mx-4 justify-center items-center text-3xl text-yellow-500 text-center hover:bg-gray-900 hover:border-gray-800 hover:text-yellow-400 duration-200">Aboutus</div>
                
                
                
            </div>
            
           
            
        </div>
    )
}