import { useEffect, useState } from "react";
import { Sahas } from "../../../../../exampleUser";
import { Standard_view } from "../Standerd_view";
import { Park_slot_view } from "./Park_slot_clicked";

export const Parkview=()=>{
    const[weekday,setmode]=useState(false);
    return(
        <div className={1 && "dark"}>
                <Standard_view/>
        </div>
    )
}