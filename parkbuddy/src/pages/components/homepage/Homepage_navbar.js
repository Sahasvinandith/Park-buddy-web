import { useEffect, useState } from "react"

export const Homepage_navbar = () => {
    const [mode, setmode] = useState(false);
    useEffect(() => {
        console.log("Current mode: ", mode)
    }, [mode])
    return (
        <div className={mode && "dark"}>
            <div className='  font-extrabold flex  w-100 h-16 py-4 text-gray-400 bg-gray-800'>
                <div className=" flex-1 pl-12 text-3xl text-yellow-500">MarkMe</div>
                <div className="flex flex-1 positon-right justify-end items-center">
                    <div className="px-4 text-xl text-white">Userdata</div>
                    <div className="px-4 text-xl text-white">Userphoto</div>
                </div>
            </div>



        </div>
    )
}

