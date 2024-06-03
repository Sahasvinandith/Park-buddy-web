import { useEffect, useState } from "react"

export const Homepage_navbar=()=>{
    const[mode,setmode]=useState(false);
    useEffect(()=>{
        console.log("Current mode: ",mode)
    },[mode])
    return(
        <div className={mode && "dark"}>
            <div className=' text-gray-800 font-extrabold flex  w-screen  py-4 bg-gray-400 dark:text-gray-400 dark:bg-gray-800'>
                <div className=" flex-1 pl-12 text-3xl text-red-500 dark:text-yellow-500" onClick={()=>{setmode(!mode)}}>MarkMe</div>
                <div className="flex flex-1 positon-right justify-end items-center">

                <div className="px-4 text-xl text-black dark:text-white">Userdata</div>
                <div className="px-4 text-xl text-black dark:text-white">Userphoto</div>
                </div>
            </div>
            
           
            
        </div>
    )
}

