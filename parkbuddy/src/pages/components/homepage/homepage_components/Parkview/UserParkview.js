import { useEffect, useState } from "react";
import { Sahas } from "../../../../../exampleUser";
import { Standard_view } from "../Standerd_view";
import { Park_slot_view } from "./Park_slot_clicked";

export const Parkview=()=>{
    const[weekday,setmode]=useState(false);
    function modeselector(){
        if(weekday){
            return(
                <div className="flex justify-center items-center">
                    <button className="my-2 ml-10 bg-green-500 text-white p-4  rounded-3xl font-bold  " onClick={()=>{setmode(!weekday)}}>Weekday Mode:On</button>
                    <button className="my-2 ml-10 bg-red-500 text-white p-4  rounded-3xl font-bold " onClick={()=>{setmode(!weekday)}}>Fullweek Mode:Off</button>
                </div>
                
            )
        }
        else{
            return(
                <div className="flex justify-center">
                    <button className="my-2 ml-10 bg-red-500 text-white p-4  rounded-3xl font-bold  " onClick={()=>{setmode(!weekday)}}>Weekday Mode:Off</button>
                    <button className="my-2 ml-10 bg-green-500 text-white p-4  rounded-3xl font-bold " onClick={()=>{setmode(!weekday)}}>Fullweek Mode:On</button>
                    
                </div>
                
            )
        }
    }

    

    

    return(
        <div className={1 && "dark"}>
                {   
                    modeselector()
                
                }
                <Standard_view/>
            


           
            
           
            
        </div>
    )
}