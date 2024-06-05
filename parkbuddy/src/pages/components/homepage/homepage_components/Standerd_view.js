import { useEffect, useState } from "react"
import { User } from "../../../../exampleUser"
import { useNavigate } from "react-router-dom";
import Park_slot_info from "./Parkview/Park_slot_clicked";

let free_lots = 0;
let Occ_lots = 0;
let Total_lots = 0;
let cur_parklot = '';
export const Standard_view = () => {

    // const [free_lots,set_free_lots]=useState(0);
    // const [Occ_lots,set_occ_lots]=useState(0);
    // const [Total_lots,set_total_lots]=useState(0);
    // const [prebooks,set_prebooks]=useState(0);
    const divElements = [];

    const [Park_view, changeView] = useState(true);

    for (const key in User.UserLots) {
        if (Object.hasOwnProperty.call(User.UserLots, key)) {
            const element = User.UserLots[key];
            Total_lots += 1;
            if (element.current == "free") {
                free_lots += 1;
                divElements.push(<div slotname={element.name} className=" rounded-lg h-5 w-5 ml-1 mr-0 flex justify-center font-semibold  cursor-pointer items-center  bg-green-200 flex-1 text-center px-10 py-8 shadow-md border-r-2 border-2 border-green-300 hover:shadow-xl hover:bg-green-400 hover:border-green-100 hover:text-yellow-100" onClick={(e) => {
                    changeView(!Park_view);
                    cur_parklot = e.currentTarget.getAttribute("slotname");



                }} >{element.name}<br />Free</div>);

            } else {
                Occ_lots += 1;
                divElements.push(<div slotname={element.name} className=" rounded-lg h-5 w-5 ml-1 mr-0 flex justify-center font-semibold  cursor-pointer items-center  bg-orange-200 flex-1 text-center px-10 py-8 shadow-md border-r-2 border-2 border-red-300 hover:shadow-xl hover:bg-orange-400 hover:border-orange-100 hover:text-yellow-100" onClick={(e) => {
                    changeView(!Park_view)
                    cur_parklot = e.currentTarget.getAttribute("slotname");

                }} >{element.name}<br />Occupied</div>);

            }

        }
    }



    return (
        <div className="flex justify-center">
            {Park_view ? <div className="bg-gray-300 mx-10 my-5 flex flex-col justify-center">
                <div className="grid grid-cols-8 gap-10 px-5 py-10">
                    {divElements}

                </div>
                <div>
                    <hr />
                    <div className="flex flex-row justify-center bg-gray-600 pt-5 text-lg text-white">
                        <div className=" h-1 bg-white w-40 mt-3 mr-1">

                        </div>
                        Current status
                        <div className=" h-1 bg-white w-40 mt-3 ml-1">

                        </div>
                    </div>


                    <div className=" p-7 bg-gray-600 pt-5 text-white flex flex-col justify-center items-center">
                        <div>Total_lots : {Total_lots}</div>
                        <div>Free_lots : {free_lots}</div>
                        <div>Occupied lots : {Occ_lots}</div>
                        <div>Charge rate (Rs/hour) : 300</div>
                        <div>prebooks : 0</div>

                    </div>

                </div>

            </div> : <Park_slot_info park_lot_id={cur_parklot} changemode={()=>{changeView(!Park_view)}}/>}

        </div>
    )

}